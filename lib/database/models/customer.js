import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class Customer extends Model {}
  Customer.init(
    {
      phone: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Swiftsend_Customers",
      timestamps: false,
    }
  );
  return Customer;
};

export default init(connection, DataTypes);
