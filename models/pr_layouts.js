"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pr_layouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pr_layouts.init(
    {
      project_id: DataTypes.NUMBER,
      room: DataTypes.NUMBER,
      floor: DataTypes.NUMBER,
      square: DataTypes.NUMBER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pr_layouts",
      tableName: "pr_layouts",
    }
  );
  return Pr_layouts;
};
