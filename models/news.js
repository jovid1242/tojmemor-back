"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init(
    {
      text: DataTypes.STRING,
      title: DataTypes.STRING,
      data: DataTypes.NUMBER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "News",
      tableName: "news",
    }
  );
  return News;
};
