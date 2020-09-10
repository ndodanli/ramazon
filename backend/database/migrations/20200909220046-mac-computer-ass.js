"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn("Macs", "computerId", {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: "Computers",
    //     key: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE",
    //   unique: true,
    // });
    
    //One-to-one
    await queryInterface.addColumn("Macs", "computerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Computers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      unique: true,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn("Macs", "computerId");
    // await queryInterface.removeColumn("Computers", "macId");
  },
};
