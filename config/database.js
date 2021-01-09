var Sequelize = require("sequelize");

// connect to database (database, username, passowrd)
module.exports = new Sequelize("biokuma", "admin", "admin", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorAliases: false,
  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idel: 10000,
  },
});
