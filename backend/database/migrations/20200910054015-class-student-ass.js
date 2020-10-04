'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ClassStudent",
    {
      FK_user_id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        references: {
          model: "User",
          key: "id",
        }
      },
      FK_student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Student",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ClassStudent")
  }
};
