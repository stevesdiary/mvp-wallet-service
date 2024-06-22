require("dotenv").config();
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import express from "express";
import userRoute from "./route/userRoute";
import accountRoute from './route/accountRoute';
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(userRoute);
app.use(accountRoute);

const port = process.env.LOCAL_PORT || 8888;

AppDataSource.initialize().then(async () => {
	app.listen(port, () => {
		console.log("Database connected successfully!");
		console.log(`App running on port ${port}.`);
	});
}).catch(error => {
	console.error("Database connection error:", error);
});
