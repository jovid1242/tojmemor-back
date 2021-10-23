"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pr_advantage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pr_advantage.init(
    {
      project_id: DataTypes.NUMBER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Pr_advantage",
      tableName: "pr_advantage",
    }
  );
  return Pr_advantage;
};
