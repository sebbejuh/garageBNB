import app from "./app"; //gets app from app.js
import mongoose from "mongoose"; //gets mongoose
import dotenv from "dotenv"; //takes dotenv(PORT & MONGO_URI) and adds it to the process

dotenv.config();

const PORT = process.env.PORT || 9999; //gives dotenv from the process to PORT
app.listen(PORT, () => console.log("Server running at http://localhost:" + PORT)); //starts server at PORT from env from the process

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI not defined in environment');
  process.exit(1);
}

mongoose
    .connect(process.env.MONGO_URI) //connects the database to MONGO_URI from env from the process
    .then(() => console.log("connected to DB")) //writes a message if connection is successful
    .catch((err: Error) => console.log(err.message)); //Writes an error message if the connection failed