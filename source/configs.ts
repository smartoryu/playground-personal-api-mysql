import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const DB_NAME = process.env.DB_NAME || 'personal';
const DB_USER = process.env.DB_USER || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const SEQUELIZE = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DIALECT as Dialect,
	logging: false,
	sync: { alter: isDev }
});

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3010;

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT
};

export default {
	sequelize: SEQUELIZE,
	server: SERVER
};
