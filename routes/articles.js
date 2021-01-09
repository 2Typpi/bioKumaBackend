var express = require("express");
var router = express.Router();

// database
const db = require("../config/database");
var products = require("../models/products");

/* GET List of articles. */
router.get("/", function (req, res, next) {
  products
    .findAll()
    .then((productList) => {
      console.log(productList);
      res.json(productList);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
