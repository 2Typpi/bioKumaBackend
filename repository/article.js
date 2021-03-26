const { v4: uuidv4 } = require("uuid");

// database
var products = require("../controllers/index").products;

module.exports = {
  create,
  getAll,
  image,
  delete: _delete,
};

const umlautMap = {
  "\u00dc": "UE",
  "\u00c4": "AE",
  "\u00d6": "OE",
  "\u00fc": "ue",
  "\u00e4": "ae",
  "\u00f6": "oe",
  "\u00df": "ss",
};

function replaceUmlaute(str) {
  return str
    .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
      const big = umlautMap[a.slice(0, 1)];
      return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
    })
    .replace(new RegExp("[" + Object.keys(umlautMap).join("|") + "]", "g"), (a) => umlautMap[a]);
}

async function getAll() {
  return await products.findAll({
    attributes: ["id", "name", "priceValue", "category", "price", "imgSrc"],
  });
}

async function create(newProduct) {
  if (
    !newProduct.name ||
    newProduct.priceValue === undefined ||
    newProduct.category === undefined ||
    newProduct.price === undefined ||
    !newProduct.imgSrc
  ) {
    return null;
  }

  newProduct.name = replaceUmlaute(newProduct.name);
  newProduct.imgSrc = "TODO";

  if (await products.findOne({ where: { name: newProduct.name } })) {
    throw 'Produkt "' + newProduct.name + '" existiert bereits.';
  }

  newProduct.id = uuidv4();
  console.log(await products.findOne({ where: { name: newProduct.name } }));

  // save user
  await products.create(newProduct);
}

async function _delete(id) {
  if (!validator.isUUID(id, 4)) {
    return null;
  }
  await products.destroy({ where: { id: id } });
}

async function image(filename) {
  let article = await products.findOne({ where: { imgSrc: "TODO" } });
  if (article) {
    article.imgSrc = filename;
    await article.save();
  }
}
