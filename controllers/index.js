const db = require("../models/index");
let User = require("../models/user");
let Product = require("../models/products");
let Order = require("../models/orders");
let Order_Products = require("../models/order_products");

module.exports = {
  user: User(db.sequelize, db.Sequelize),
  products: Product(db.sequelize, db.Sequelize),
  orders: Order(db.sequelize, db.Sequelize),
  order_products: Order_Products(db.sequelize, db.Sequelize),
};
