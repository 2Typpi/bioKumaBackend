"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      priceValue: { type: DataTypes.INTEGER, allowNull: false },
      category: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      imgSrc: { type: DataTypes.STRING, allowNull: true },
    },
    {}
  );
  Products.associate = (models) => {};

  Products.sync().then(
    function () {
      console.log("User table successfully");
    },
    function (err) {
      console.error("An error occurred while creating table : " + err.stack);
    }
  );

  return Products;
};
