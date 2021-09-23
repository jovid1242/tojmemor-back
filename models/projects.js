"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projects.init(
    {
      text: DataTypes.STRING,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Projects",
      tableName: "projects",
    }
  );
  return Projects;
};
