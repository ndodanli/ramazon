import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/amazona",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  SESSION_SECRET:
    process.env.SESSION_SECRET || "JEROMETHEWILDERNESS node server.js",
  POSTGRES_USER: process.env.POSTGRES_USER || "euler",
  POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
  POSTGRES_DATABASE_NAME: process.env.POSTGRES_DATABASE_NAME || "my_database",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "denemE1@",
  POSTGRES_PORT: process.env.POSTGRES_PORT || "5432",
};
