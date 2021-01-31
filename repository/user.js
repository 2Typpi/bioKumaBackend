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

async function authenticate({ username, password }) {
  if (!validator.isAscii(username) || !validator.isAscii(password)) {
    return null;
  }

  const userToCompare = await user.findOne({ where: { username: username } });
  if (userToCompare && bcrypt.compareSync(password, userToCompare.hash)) {
    // Filter unnecessary properties
    const { hash, createdAt, createdDate, updatedAt, ...userWithoutHash } = userToCompare.toJSON();

    const token = jwt.sign({ sub: userToCompare.id }, config.secret);
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
