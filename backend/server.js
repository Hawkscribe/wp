import express from 'express';
import dotenv from "dotenv";  // Import dotenv
dotenv.config();  
const mongoURL = process.env.MONGO_URL;
import cors from 'cors';
const app=express();
import mongoose from 'mongoose';
import loginOut from "./routes/loginOut.js";
import calendar from "./routes/calendar.js";
import allTodo from "./routes/alltodo.js";
import { auth } from "./middleware.js";
try {
    mongoose.connect(mongoURL);
    console.log("Mongoose started");
} catch (error) {
    console.log("Error in connecting database");
}
app.use(express.json());
app.use(cors({ origin: '*' })); // Explicitly allow all origins
app.get('/',(req,res)=>{
    res.status(200).send('Party is on!!!');
});
app.use("/api/user",loginOut);
app.use("/api/todo",auth,allTodo);
app.use("/api/calendar",auth,calendar);


app.listen(8000,()=>{
    console.log("the server is live!!!");
})