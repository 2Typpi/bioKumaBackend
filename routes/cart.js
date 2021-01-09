var express = require("express");
var router = express.Router();

// database
const db = require("../config/database");
var products = require("../models/products");

/* POST recieve cart. */
router.post("/", async function (req, res, next) {
  let totalPrice = await getSQL(req.body.cart);
  if (totalPrice < 0) {
    res.status(400).send({
      message: "something failed please try again",
    });
  } else {
    res.send("" + totalPrice);
  }
});

async function getSQL(cart) {
  let cost = 0;
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
        if (item.count <= 0 || cost < 0 || !article.isEmpty) {
          cost = -1;
        } else {
          console.log(article);
          cost += article.pop().price * item.count;
        }
      })
      .catch((err) => console.log(err));
  }
  return cost;
}

module.exports = router;
