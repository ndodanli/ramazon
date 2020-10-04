"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("ChatRoom",{
      fields: ['name'],
      type: 'unique',
      name: 'unique_name'
    });
  },  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("ChatRoom", "unique_name");
  },
};