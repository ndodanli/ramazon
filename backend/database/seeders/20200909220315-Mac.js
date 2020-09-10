"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Computers", [
      {
        modelName: "ABRA-A5",
        price: 5000,
        // macId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Macs", [
      {
        macAddress: "A2:G2:H6:Y3",
        location: "location1",
        computerId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Mac", null, {});
  },
};
