require("dotenv").config();
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import {Request, Response} from "express";
import express from "express";
import userRoute from "./route/userRoute";
import accountRoute from './route/loginRoute';
import transactionRoute from "./route/transactionRoute";
import logingRoute from "./route/loginRoute";
const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use(transactionRoute);
app.use(userRoute);
app.use(accountRoute);
app.use(logingRoute);

app.get("/", (req:Request, res: Response) => {
	return res.status(200).send("Welcome to my simple loan application.");
})


const port = process.env.LOCAL_PORT || 8888;

AppDataSource.initialize().then(async () => {
	app.listen(port, () => {
		console.log("Database connected successfully!");
		console.log(`App running on port ${port}.`);
	});
}).catch(error => {
	console.error("Database connection error:", error);
});
