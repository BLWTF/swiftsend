import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init = (sequelize, DataTypes) => {
  class Package extends Model {}
  Package.init(
    {
      senderName: DataTypes.STRING,
      recipientName: DataTypes.STRING,
      trackingNumber: DataTypes.STRING,
      fromAddress: DataTypes.STRING,
      toAddress: DataTypes.STRING,
      packageContent: DataTypes.STRING,
      packageWeight: DataTypes.STRING,
      packageDimenstions: DataTypes.STRING,
      pickupDate: DataTypes.STRING,
      deliveryDate: DataTypes.STRING,
      deliveryCost: DataTypes.STRING,
      deliveryStatus: {
        type: DataTypes.ENUM("pending pickup", "in transit", "delivered"),
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "pending", "overdue"),
      },
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Package",
      tableName: "Swiftsend_Packages",
    }
  );
  return Package;
};

export default init(connection, DataTypes);
