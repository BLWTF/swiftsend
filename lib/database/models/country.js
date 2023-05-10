import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class Country extends Model {}
  Country.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "Swiftsend_Countries",
      timestamps: false,
    }
  );
  return Country;
};

export default init(connection, DataTypes);
