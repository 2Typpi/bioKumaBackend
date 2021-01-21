var express = require("express");
var router = express.Router();

// database
var products = require("../controllers/index").products;

/* POST recieve cart. */
router.post("/", async function (req, res, next) {
  let totalPrice = await getSQL(req.body.cart);
  if (totalPrice === -1) {
    res.status(400).send({
      message: "Something failed please try again",
    });
  } else if (totalPrice === -2) {
    res.status(400).send({
      message: "Please select a article",
    });
  } else {
    res.send("" + totalPrice);
  }
});

async function getSQL(cart) {
  let cost = 0;
  if (cart.length <= 0) {
    return -2;
  }
  for (const item of cart) {
    await products
      .findAll({
        attributes: ["name", "priceValue", "price"],
        raw: true,
        where: {
          id: item.articleId,
        },
      })
      .then((article) => {
        if (item.count <= 0 || cost < 0) {
          cost = -1;
        } else {
          cost += article.pop().price * item.count;
        }
      })
      .catch((err) => console.log(err));
  }
  return cost;
}

module.exports = router;
