import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const config = process.env;

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    port: Number(config.DATABASE_PORT),
    dialect: config.DATABASE_DIALECT,
    timezone: "+08:00",
  }
);

export default sequelize;
