"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash("swift1234", 10);

    return await queryInterface.bulkInsert("SwiftSend_Users", [
      {
        firstName: "Super",
        lastName: "Admin",
        email: "superadmin@swiftsend.com",
        password: hashPassword,
        isAdmin: true,
        createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
        updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("SwiftSend_Users", {
      email: { [Sequelize.Op.in]: ["superadmin@swiftsend.com"] },
    });
  },
};
