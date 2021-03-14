// database
var products = require("../controllers/index").products;

module.exports = {
  create,
  getAll,
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
    attributes: ["id", "name", "priceValue", "category", "description", "price", "imgSrc"],
  });
}

async function create(newProduct) {
  if (
    !newProduct.name ||
    !newProduct.priceValue ||
    !newProduct.category ||
    !newProduct.price ||
    !newProduct.imgSrc
  ) {
    return null;
  }

  newProduct.name = replaceUmlaute(newProduct.name);
  newProduct.imgSrc = replaceUmlaute(newProduct.imgSrc);

  if (await products.findOne({ where: { name: newProduct.name } })) {
    throw 'Produkt "' + newProduct.name + '" existiert bereits.';
  }

  // save user
  await user.create(newProduct);
}

async function _delete(id) {
  if (!validator.isUUID(id, 4)) {
    return null;
  }
  await products.destroy({ where: { id: id } });
}
