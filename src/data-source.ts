import "reflect-metadata"
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm"
// import { User } from "./entity/User";
import { Transaction } from "./entity/Transaction";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})

export default AppDataSource;