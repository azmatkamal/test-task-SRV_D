"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      customer: DataTypes.STRING,
      dispensary: DataTypes.STRING,
      status: DataTypes.ENUM("PLACED", "DISPATCHED"),
      borough: DataTypes.ENUM(
        "MANHATTAN",
        "BROOKLYN",
        "QUEENS",
        "BRONX",
        "STATEN_ISLAND"
      ),
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
