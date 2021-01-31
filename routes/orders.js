var express = require("express");
var router = express.Router();

// database
var ordersModel = require("../controllers/index").orders;
var order_productsModel = require("../controllers/index").order_products;

/* GET List of articles. */
router.post("/", async function (req, res, next) {
  let response = await getOrder(req.body);
  console.log(response);
  res.json(response);
});

async function getOrder(user) {
  let fullOrder = [];
  await ordersModel
    .findAll({
      attributes: ["id", "datetime"],
      raw: true,
      where: {
        userId: user.id,
      },
    })
    .then(async (orderList) => {
      for (const singleOrder of orderList) {
        let singleFullOrder = await getProductsOfOrder(singleOrder);
        let tempJson = {
          datetime: singleOrder.datetime,
        };
        singleFullOrder.push(tempJson);
        fullOrder.push(singleFullOrder);
      }
    })
    .catch((err) => console.log(err));
  return fullOrder;
}

async function getProductsOfOrder(singleOrder) {
  let fullOrder = [];
  await order_productsModel
    .findAll({
      attributes: ["productId", "productQuantity"],
      raw: true,
      where: {
        orderId: singleOrder.id,
      },
    })
    .then((orderProductList) => {
      for (const orderProduct of orderProductList) {
        fullOrder.push(orderProduct);
      }
    })
    .catch((err) => console.log(err));
  return fullOrder;
}

module.exports = router;
