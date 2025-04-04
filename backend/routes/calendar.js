import express from "express";
import { EventModel } from "../database/database.js";

const router = express.Router();

router.post("/event", async (req, res) => {
    const { date, message } = req.body;
    try {
        let event = await EventModel.findOne({ date });

        if (event) {
            event.message = message;
        } else {
            event = new EventModel({ date, message }); 
        }

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ msg: "Error message!!!", error: error.message });
    }
});

router.get("/event/:year/:month", async (req, res) => {
    const { year, month } = req.params;

    try {
        const formattedMonth = String(month).padStart(2, "0"); 
        const events = await EventModel.find({ date: { $regex: `^${year}-${formattedMonth}` } });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ msg: "There is an error in the getting port", error: error.message });
    }
});

export default router;
