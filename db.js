// db.js
require("dotenv").config();
const { Pool } = require("pg");

const isProd = process.env.NODE_ENV === "production";

const pool = new Pool(
  isProd
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
);

module.exports = pool;
