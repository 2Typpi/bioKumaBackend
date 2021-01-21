var express = require("express");
var router = express.Router();

// database
var products = require("../controllers/index").products;

/* GET List of articles. */
router.get("/", function (req, res, next) {
  products
    .findAll({attributes: ['id', 'name', 'priceValue', 'category', 'description', 'price', 'imgSrc']})
    .then((productList) => {
      console.log(productList);
      res.json(productList);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
