"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 0,
          name: "Gurke",
          priceValue: 1,
          category: 0,
          description: null,
          price: 1.0,
          imgSrc: "gurke",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 1,
          name: "Karotte",
          priceValue: 0,
          category: 0,
          description: null,
          price: 0.99,
          imgSrc: "karotte",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 2,
          name: "Zwiebel",
          priceValue: 0,
          category: 0,
          description: null,
          price: 1.99,
          imgSrc: "zwiebel",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 3,
          name: "Eisbergsalat",
          priceValue: 1,
          category: 0,
          description: null,
          price: 1.99,
          imgSrc: "eisbergsalat",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 4,
          name: "Tomate",
          priceValue: 0,
          category: 0,
          description: null,
          price: 1.0,
          imgSrc: "tomate",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 5,
          name: "Milch",
          priceValue: 1,
          category: 2,
          description: null,
          price: 1.99,
          imgSrc: "milch",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 6,
          name: "Rindfleisch",
          priceValue: 0,
          category: 3,
          description: null,
          price: 20.0,
          imgSrc: "rind",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          id: 7,
          name: "Apfel",
          priceValue: 0,
          category: 1,
          description: null,
          price: 5.99,
          imgSrc: "apfel",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ],
      {}
    );
  },

  /**
   * revert seed
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
