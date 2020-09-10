"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Students", [
      {
        name: "testStudentName1",
        no: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Classes", [
      {
        name: "testClassName1",
        floor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("ClassStudents", [
      {
        classId: 1,
        studentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Students", null, {});
    await queryInterface.bulkDelete("Classes", null, {});
    await queryInterface.bulkDelete("ClassStudents", null, {});
  },
};
