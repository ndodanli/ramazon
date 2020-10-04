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
    await queryInterface.addColumn("Mac", "FK_computer_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Computer",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      unique: true,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn("Mac", "FK_computer_id");
    // await queryInterface.removeColumn("Computers", "macId");
  },
};
