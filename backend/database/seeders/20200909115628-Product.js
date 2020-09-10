"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "productName1",
          image: "productImage1",
          brand: "productBrand1",
          price: 11,
          category: "productCategory1",
          countInStock: 1,
          description: "productDescription1",
          rating: 1,
          numOfReviews: 111,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "productName1",
          image: "productImage1",
          brand: "productBrand1",
          price: 11,
          category: "productCategory1",
          countInStock: 1,
          description: "productDescription1",
          rating: 1,
          numOfReviews: 111,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Products", null, {});
  },
};
