const db = require("../models/index");
let User = require("../models/user");
let Product = require("../models/products");

module.exports = {
  user: User(db.sequelize, db.Sequelize),
  products: Product(db.sequelize, db.Sequelize)
};
