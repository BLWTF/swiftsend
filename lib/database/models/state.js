import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class State extends Model {}
  State.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "State",
      tableName: "Swiftsend_States",
      timestamps: false
    }
  );
  return State;
};

export default init(connection, DataTypes);
