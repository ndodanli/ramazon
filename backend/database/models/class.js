'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsToMany(models.Student, {through:"ClassStudent"})
    }
  };
  Class.init({
    name: DataTypes.STRING,
    floor: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName:true,
    modelName: 'Class',
  });
  return Class;
};