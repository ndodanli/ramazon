"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "ahmet2312",
          password: "dsrr3fqwf32f",
          name: "Ahmet",
          email: "ahmetwrw@gmail.com",
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Johnds2d",
          password: "sssfwe42432",
          isAdmin: false,
          name: "Jon Doe",
          email: "jondoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
  },
};
