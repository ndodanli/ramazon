"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getName() {
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
        comment: "User's password",
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      test_value_under: DataTypes.ARRAY(DataTypes.STRING),
      test_value_two: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: "User",
    }
  );
  return User;
};
