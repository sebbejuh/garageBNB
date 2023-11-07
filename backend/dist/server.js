"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); //gets app from app.js
const mongoose_1 = __importDefault(require("mongoose")); //gets mongoose
const dotenv_1 = __importDefault(require("dotenv")); //takes dotenv(PORT & MONGO_URI) and adds it to the process
dotenv_1.default.config();
const PORT = process.env.PORT || 9999; //gives dotenv from the process to PORT
app_1.default.listen(PORT, () => console.log("Server running at http://localhost:" + PORT)); //starts server at PORT from env from the process
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not defined in environment');
    process.exit(1);
}
mongoose_1.default
    .connect(process.env.MONGO_URI) //connects the database to MONGO_URI from env from the process
    .then(() => console.log("connected to DB")) //writes a message if connection is successful
    .catch((err) => console.log(err.message)); //Writes an error message if the connection failed
