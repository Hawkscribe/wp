const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('monggoose');
import allTodo from "./routes/alltodo.js";
try {
    mongoose.connnct('mongodb+srv://database1:123456789pwd@cluster0.bhtab.mongodb.net/p1');
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
app.use("/api/todo",allTodo);



app.listen(8000,()=>{
    console.log('no problem');
})