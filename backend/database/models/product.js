"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull:false,
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      brand: DataTypes.STRING,
      price: DataTypes.INTEGER,
      category: DataTypes.STRING,
      count_in_stock: DataTypes.INTEGER,
      description: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      num_reviews: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
