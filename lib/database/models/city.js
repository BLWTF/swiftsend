import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class City extends Model {}
  City.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
      tableName: "Swiftsend_Cities",
      timestamps: false
    }
  );
  return City;
};

export default init(connection, DataTypes);
