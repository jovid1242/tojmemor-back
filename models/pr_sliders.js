"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pr_sliders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pr_sliders.init(
    {
      project_id: DataTypes.NUMBER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pr_sliders",
      tableName: "pr_sliders",
    }
  );
  return Pr_sliders;
};
