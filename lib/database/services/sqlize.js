import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { City, Country, State, User } from "../models";
import Customer from "../models/customer";
import Package from "../models/package";

export default class SqlizeService {
  formatCustomerSearch(search) {
    const searchQuery = !search
      ? {}
      : {
          [Sequelize.Op.or]: [
            {
              firstName: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              lastName: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
          ],
        };

    return searchQuery;
  }

  formatPackageSearch(search) {
    const searchQuery = !search
      ? {}
      : {
          [Sequelize.Op.or]: [
            {
              senderName: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              recipientName: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              toAddress: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              fromAddress: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              packageContent: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
            {
              trackingNumber: {
                [Sequelize.Op.like]: `%${search}%`,
              },
            },
          ],
        };

    return searchQuery;
  }

  async getCustomers({ offset = null, limit = null, search = null }) {
    const searchQuery = this.formatCustomerSearch(search);
    return await Customer.findAll({
      where: {
        ...searchQuery,
      },
      order: [["id", "DESC"]],
      limit: +limit,
      offset: +offset,
      include: [User, {
        model: City,
        as: "city"
      }],
    });
  }

  async countCustomers({ search = null }) {
    const searchQuery = this.formatCustomerSearch(search);
    return await Customer.count({
      where: {
        ...searchQuery,
      },
    });
  }

  async getPackage({ id }) {
    return await Package.findByPk(id, {
      include: [
        {
          model: City,
          as: "toCity",
          include: {
            model: State,
            as: "state",
            include: {
              model: Country,
              as: "country",
            }
          }
        },
        {
          model: City,
          as: "fromCity",
          include: {
            model: State,
            as: "state",
            include: {
              model: Country,
              as: "country",
            }
          }
        },
      ],
    });
  }
 
  async getPackages({ offset = null, limit = null, search = null }) {
    const searchQuery = this.formatPackageSearch(search);
    return await Package.findAll({
      where: {
        ...searchQuery,
      },
      include: [
        {
          model: City,
          as: "toCity",
        },
        {
          model: City,
          as: "fromCity",
        },
      ],
      order: [["id", "DESC"]],
      limit: +limit,
      offset: +offset,
    });
  }

  async countPackages({ search = null }) {
    const searchQuery = this.formatPackageSearch(search);
    return await Package.count({
      where: {
        ...searchQuery,
      },
    });
  }

  async getUserByEmail(email) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async createPackage({
    fromCustomerId,
    toCustomerId,
    senderName,
    recipientName,
    trackingNumber,
    fromAddress,
    toAddress,
    fromCityId,
    toCityId,
    packageContent,
    packageWeight,
    packageDimensions,
    pickupDate,
    deliveryDate,
    deliveryCost,
    deliveryStatus,
    paymentStatus,
    note,
  }) {
    const pkg = await Package.create({
      fromCustomerId,
      toCustomerId,
      senderName,
      recipientName,
      trackingNumber,
      fromAddress,
      toAddress,
      fromCityId,
      toCityId,
      packageContent,
      packageWeight,
      packageDimensions,
      pickupDate,
      deliveryDate,
      deliveryCost,
      deliveryStatus,
      paymentStatus,
      note,
    });

    return pkg;
  }
}
