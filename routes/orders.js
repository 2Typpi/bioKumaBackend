var express = require("express");
var router = express.Router();
const userService = require("../repository/user");

// Check Authority
const accessController = require("../helper/accessController");

// database
var ordersModel = require("../controllers/index").orders;
var order_productsModel = require("../controllers/index").order_products;

router.post("/", accessController.grantAccess("readOwn", "order"), fetchUsersOrder);
router.post("/all", accessController.grantAccess("readAny", "order"), fetchAllOrders);

/* GET List of articles. */
async function fetchUsersOrder(req, res, next) {
  let fullOrder = [];
  await ordersModel
    .findAll({
      attributes: ["id", "datetime"],
      raw: true,
      where: {
        userId: req.body.id,
      },
    })
    .then(async (orderList) => {
      for (const singleOrder of orderList) {
        let singleFullOrder = await getProductsOfOrder(singleOrder);
        let tempJson = {
          datetime: singleOrder.datetime,
          order: singleFullOrder,
        };
        fullOrder.push(tempJson);
      }
    })
    .catch((err) => console.log(err));
  res.json(fullOrder);
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

async function fetchAllOrders(req, res, next) {
  let fullOrder = [];
  await ordersModel
    .findAll({
      attributes: ["id", "userId", "datetime"],
      raw: true,
    })
    .then(async (orderList) => {
      for (const singleOrder of orderList) {
        let singleFullOrder = await getProductsOfOrder(singleOrder);
        let userOfOrder = await userService.getById(singleOrder.userId);
        let tempJson = {
          order: singleFullOrder,
          datetime: singleOrder.datetime,
          username: userOfOrder.username,
        };
        fullOrder.push(tempJson);
      }
    })
    .catch((err) => console.log(err));
  res.json(fullOrder);
}

module.exports = router;
