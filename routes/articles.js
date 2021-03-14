var express = require("express");
var router = express.Router();

//Repository
const productService = require("../repository/article");

/* GET List of articles. */
router.get("/", function (req, res, next) {
  productService
    .getAll()
    .then((product) => (product ? res.json(product) : res.sendStatus(404)))
    .catch((err) => next(err));
});

/* POST Create a new product. */
router.post("/create", function (req, res, next) {
  productService
    .create(req.product)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

/* POST Delete a product. */
router.post("/delete", function (req, res, next) {
  productService
    .delete(req.product)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

module.exports = router;
