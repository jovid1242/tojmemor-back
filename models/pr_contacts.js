"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pr_contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pr_contacts.init(
    {
      project_id: DataTypes.NUMBER,
      adress: DataTypes.TEXT,
      phone: DataTypes.NUMBER,
      email: DataTypes.STRING,
      url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Pr_contacts",
      tableName: "pr_contacts",
    }
  );
  return Pr_contacts;
};
