'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Computer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Computer.init({
    modelName: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Computer',
  });
  return Computer;
};