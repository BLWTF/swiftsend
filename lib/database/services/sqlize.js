import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { User, Account, Transaction } from "../models";

export default class SqlizeService {
  async getUser({ id, includeAccount = false }) {
    return await User.findByPk(id, {
      include: includeAccount
        ? { model: Account, include: [Transaction], attributes }
        : null,
      attributes: {
        exclude: ["password"],
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

  async getUsers(not = null) {
    return await User.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: not,
        },
      },
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Account,
        include: [
          {
            model: Transaction,
          },
        ],
      },
    });
  }

  async createUser({
    firstName,
    lastName,
    email,
    password,
    accountNumber,
    balance,
  }) {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    if (accountNumber) {
      await this.createAccount({
        user,
        number: accountNumber,
        balance,
      });
    }

    return user;
  }

  async createAccount({ user, number, balance }) {
    const account = await user.createAccount({ number });

    if (balance) {
      await this.createTransaction({
        account,
        amount: balance,
        transactionType: "deposit",
        status: "successful",
      });
    }

    return account;
  }

  async createTransaction({
    account,
    amount,
    transactionType,
    date,
    description,
    status,
    referenceNumber,
  }) {
    const transaction = await account.createTransaction({
      amount,
      date: date ?? Sequelize.literal("CURRENT_TIMESTAMP"),
      transactionType,
      description,
      balance: account.balance,
      status,
      referenceNumber,
    });

    account.balance = (amount.balance ?? 0) + amount;
    await account.save();
    return transaction;
  }
}
