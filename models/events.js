"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init(
    {
      text: DataTypes.STRING,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Events",
      tableName: "events",
    }
  );
  return Events;
};
