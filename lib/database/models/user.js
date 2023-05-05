import { Model, DataTypes } from "sequelize"
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'SwiftSend_Users'
  });
  return User;
};

export default init(connection, DataTypes)