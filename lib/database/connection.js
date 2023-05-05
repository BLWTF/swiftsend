import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const connection = new Sequelize({
	dialect: "mysql",
	database: process.env.DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	dialectOptions: {
		ssl: {
			rejectUnauthorized: true,
		},
	},
	dialectModule: mysql2,
})

export default connection