import config from "./config";
var pgtools = require("pg");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: config.POSTGRES_USER,
  host: config.POSTGRES_HOST,
  database: config.POSTGRES_DATABASE_NAME,
  password: config.POSTGRES_PASSWORD,
  port: config.POSTGRES_PORT,
});

export default pool;