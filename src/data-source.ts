import "reflect-metadata"
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Transaction } from "./entity/Transaction";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Transaction],
  migrations: [],
  subscribers: [],
})