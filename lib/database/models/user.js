import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Swiftsend_Users",
    }
  );
  return User;
};

export default init(connection, DataTypes);
