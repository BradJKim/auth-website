const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: path.resolve(__dirname, "./.env.local") });

const db = new Sequelize(
    database        = process.env.DB_DATABASE, 
    username        = 'me', 
    password        = process.env.DB_PASSWORD, 
    options = {
        host: 'localhost',
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
);

module.exports = db;
