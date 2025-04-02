import { EventModel } from "../database/todo";
import express from'express';

const router=express.Router();

router.post("/event",async(req,res)=>{
    const {date,message}=req.body;
    try {
        let event=await Event.findOne({date});
        if (event) {
            event.message=message;
        }else{
            event.message=message;
        }
        await event.save();
res.status(200).json(event);
    } catch (error) {
        res.status(500).json({msg:"Error message!!!"});
    }
});

router.get("/event/:year/:month",async(req,res)=>{
    const {year,month}=req.params;
    try {
        const events = await Event.find({ date: { $regex: `^${year}-${month.padStart(2, "0")}` } });
res.status(200).json(events);
    } catch (error) {
     res.status(500).json({msg:"There is an error in the getting port"});

    }
})

export default router;