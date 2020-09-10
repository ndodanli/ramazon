'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsToMany(models.Class, {through: "ClassStudent"})
    }
  };
  Student.init({
    name: DataTypes.STRING,
    no: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName:true,
    modelName: 'Student',
  });
  return Student;
};