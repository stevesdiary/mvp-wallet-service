import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import * as bodyParser from "body-parser";
// --es-module-specifier-resolution=node;
import dataSource from "./data-source";
// import { DataSource } from 'typeorm';
import { Request, Response } from "express";
import express from "express";
import userRoute from "./route/userRoute";
import accountRoute from './route/loginRoute';
import userController from './controller/userController';
import transactionRoute from "./route/transactionRoute";
import logingRoute from "./route/loginRoute";
const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use(transactionRoute);
app.use(userRoute);
// app.use(userController);
app.use(accountRoute);
app.use(logingRoute);

app.get("/", (req:Request, res: Response) => {
	return res.status(200).send("Welcome to my simple loan application.");
})


const port = process.env.LOCAL_PORT || 8888;
console.log("Port", port, "And Host", process.env.DB_USERNAME);
dataSource.initialize().then(async () => {
	app.listen(port, () => {
		console.log("Database connected successfully!");
		console.log(`App running on port ${port}.`);
	});
}).catch((error: any) => {
	console.error("Database connection error:", error);
});
