var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");

//Repository
const productService = require("../repository/article");

//Config
const config = require("../config/config.json");

let diskPath = path.join(__dirname, config.IMAGE_PATH);

let imgStorage = multer.diskStorage({
  destination: diskPath,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
let imgUpload = multer({ storage: imgStorage });

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
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

/* POST Delete a product. */
router.post("/delete", function (req, res, next) {
  productService
    .delete(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

/* POST Delete a product. */
router.post("/create/image", imgUpload.single("productImage"), function (req, res, next) {
  productService
    .image(req.file.filename)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

module.exports = router;
