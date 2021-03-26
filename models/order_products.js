"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_Products = sequelize.define(
    "order_products",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "orders", key: "id" },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "products", key: "id" },
      },
      productQuantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Order_Products.associate = (models) => {};

  Order_Products.sync().then(
    function () {
      console.log("User table successfully");
    },
    function (err) {
      console.error("An error occurred while creating table : " + err.stack);
    }
  );

  return Order_Products;
};
