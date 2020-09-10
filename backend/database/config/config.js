require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    username: "euler",
    password: "denemE1@",
    database: "dev_db",
    host: "127.0.0.1",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
    username: "euler",
    password: "denemE1@",
    database: "dev_db",
    host: "127.0.0.1",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    username: "euler",
    password: "denemE1@",
    database: "dev_db",
    host: "127.0.0.1",
  },
};
