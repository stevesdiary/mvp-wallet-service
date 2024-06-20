import "reflect-metadata"
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Account } from "./entity/Account";
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
  entities: [User, Account],
  migrations: [],
  subscribers: [],
})