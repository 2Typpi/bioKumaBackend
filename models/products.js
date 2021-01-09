const Sequelize = require("sequelize");
const db = require("../config/database");

const Products = db.define("products", {
  name: {
    type: Sequelize.STRING,
  },
  priceValue: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
  },
  imgSrc: {
    type: Sequelize.STRING,
  },
});

module.exports = Products;
