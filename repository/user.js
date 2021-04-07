const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../controllers/index").user;
var validator = require("validator");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  authenticate,
  getById,
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

async function authenticate({ username, password }) {
  if (!validator.isAscii(username) || !validator.isAscii(password)) {
    return null;
  }

  const userToCompare = await user.findOne({ where: { username: username } });
  if (userToCompare && bcrypt.compareSync(password, userToCompare.hash)) {
    // Filter unnecessary properties
    const { hash, createdAt, createdDate, updatedAt, ...userWithoutHash } = userToCompare.toJSON();

    const token = jwt.sign({ sub: userToCompare.id, role: userToCompare.role }, config.secret);
    return {
      ...userWithoutHash,
      token,
    };
  }
}

async function getById(id) {
  if (!validator.isUUID(id, 4)) {
    return null;
  }
  return await user.findByPk(id, {
    attributes: {
      exclude: ["hash"],
    },
  });
}

/*
 * Needs:
 * username: string
 * password: string
 */
async function create(userParam) {
  userParam.username = replaceUmlaute(userParam.username);
  userParam.password = replaceUmlaute(userParam.password);
  userParam.firstName = replaceUmlaute(userParam.firstName);
  userParam.lastName = replaceUmlaute(userParam.lastName);
  userParam.street = replaceUmlaute(userParam.street);
  userParam.houseNumber = replaceUmlaute(userParam.houseNumber);
  userParam.city = replaceUmlaute(userParam.city);
  userParam.PLZ = replaceUmlaute(userParam.PLZ);

  if (
    !validator.isAscii(userParam.username) ||
    !validator.isAscii(userParam.password) ||
    !validator.isAscii(userParam.firstName) ||
    !validator.isAscii(userParam.lastName) ||
    !validator.isAscii(userParam.street) ||
    !validator.isAscii(userParam.houseNumber) ||
    !validator.isAscii(userParam.city) ||
    !validator.isAscii(userParam.PLZ)
  ) {
    return null;
  }
  // validate
  if (await user.findOne({ where: { username: userParam.username } })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }
  let userToCreate = userParam;

  // hash password
  if (userToCreate.password) {
    userToCreate.hash = bcrypt.hashSync(userParam.password, 10);
  }
  userToCreate.id = uuidv4();

  // save user
  await user.create(userToCreate);
}

async function getAll() {
  return await user.findAll({
    attributes: {
      exclude: ["hash"],
    },
  });
}

async function _delete(id) {
  if (!validator.isUUID(id, 4)) {
    return null;
  }
  await user.destroy({ where: { id: id } });
}
