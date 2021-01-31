"use strict";
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false, references: { model: "users", key: "id" } },
      datetime: { type: DataTypes.DATEONLY, allowNull: false },
    },
    {}
  );
  Orders.associate = (models) => {};

  Orders.sync().then(
    function () {
      console.log("User table successfully");
    },
    function (err) {
      console.error("An error occurred while creating table : " + err.stack);
    }
  );

  return Orders;
};
