"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    getName(){
      return this.Name;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        comment: "This is a column name that has a comment",
      },
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      IsAdmin: DataTypes.BOOLEAN,
      TestValueUnder: DataTypes.ARRAY(DataTypes.STRING),
      TestValueTwo: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "User",
    }
  );
  return User;
};