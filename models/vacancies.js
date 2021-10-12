"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vacancies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vacancies.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vacancies",
      tableName: "vacancies",
    }
  );
  return Vacancies;
};
