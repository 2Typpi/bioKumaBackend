var express = require("express");
var router = express.Router();

// Enum
const priceValueEnum = {
  WEIGH: 0,
  PIECE: 1,
};

// database
var products = require("../controllers/index").products;
var user = require("../controllers/index").user;
var ordersModel = require("../controllers/index").orders;
var order_productsModel = require("../controllers/index").order_products;

/* POST recieve cart. */
router.post("/", async function (req, res, next) {
  let totalPrice = await getSQL(req.body.cart, req.body.user);
  if (totalPrice === -1) {
    res.status(400).send({
      message: "Something failed please try again",
    });
  } else if (totalPrice === -2) {
    res.status(400).send({
      message: "Please select a article",
    });
  } else {
    console.log("totalPrice: " + totalPrice + "€");
    let order = await createOrder(req.body.user);
    for (const item of req.body.cart) {
      createOrderWithProducts(item, order);
    }
    res.send("" + totalPrice);
  }
});

async function createOrder(purchaser) {
  let orderToCreate = {
    userId: purchaser.id,
    datetime: Date.now(),
  };
  return await ordersModel.create(orderToCreate);
}

async function createOrderWithProducts(item, order) {
  let orderProductsToCreate = {
    orderId: order.id,
    productId: item.articleId,
    productQuantity: item.count,
  };

  await order_productsModel.create(orderProductsToCreate);
}

async function getSQL(cart, purchaser) {
  let cost = 0;
  if (cart.length <= 0) {
    return -2;
  }
  if (await user.findOne({ where: { username: purchaser.username } })) {
    //TODO: Send Data to a printer
    console.log(purchaser.firstName + " " + purchaser.lastName);
    console.log(purchaser.street + " " + purchaser.houseNumber);
    console.log(purchaser.city + " " + purchaser.PLZ);
  } else {
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
        let product = article.pop();
        if (item.count <= 0 || cost < 0) {
          cost = -1;
        } else {
          if (product.priceValue === priceValueEnum.WEIGH) {
            cost += (product.price / 1000) * item.count;
            console.log(item.count + "g " + product.name + " " + product.price + "€");
          } else {
            cost += product.price * item.count;
            console.log(item.count + "x " + product.name + " " + product.price + "€");
          }
        }
      })
      .catch((err) => console.log(err));
  }
  return cost;
}

module.exports = router;
