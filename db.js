require("dotenv").config();
const { Pool } = require("pg");

const isProd = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProd ? process.env.DATABASE_URL : undefined,
  host: isProd ? undefined : process.env.DB_HOST,
  port: isProd ? undefined : process.env.DB_PORT,
  user: isProd ? undefined : process.env.DB_USER,
  password: isProd ? undefined : process.env.DB_PASSWORD,
  database: isProd ? undefined : process.env.DB_NAME,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
