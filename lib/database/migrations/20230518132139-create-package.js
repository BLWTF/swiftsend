"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Swiftsend_Packages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fromCustomerId: {
        type: Sequelize.INTEGER,
      },
      toCustomerId: {
        type: Sequelize.INTEGER,
      },
      senderName: {
        type: Sequelize.STRING,
      },
      recipientName: {
        type: Sequelize.STRING,
      },
      trackingNumber: {
        type: Sequelize.STRING,
      },
      fromAddress: {
        type: Sequelize.STRING,
      },
      toAddress: {
        type: Sequelize.STRING,
      },
      fromCityId: {
        type: Sequelize.INTEGER,
      },
      toCityId: {
        type: Sequelize.INTEGER,
      },
      packageContent: {
        type: Sequelize.STRING,
      },
      packageWeight: {
        type: Sequelize.INTEGER,
      },
      packageDimensions: {
        type: Sequelize.INTEGER,
      },
      pickupDate: {
        type: Sequelize.DATE,
      },
      deliveryDate: {
        type: Sequelize.DATE,
      },
      deliveryCost: {
        type: Sequelize.INTEGER,
      },
      deliveryStatus: {
        type: Sequelize.ENUM,
        values: ["pending pickup", "in transit", "delivered"],
      },
      paymentStatus: {
        type: Sequelize.ENUM,
        values: ["paid", "pending", "overdue"],
      },
      note: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Swiftsend_Packages');
  },
};
