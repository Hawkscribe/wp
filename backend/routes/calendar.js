import express from "express";
import { EventModel } from "../database/database.js";
import moment from "moment";  
import { auth } from '../middleware.js';

const router = express.Router();

router.post("/event",auth, async (req, res) => {
    const { date, message } = req.body;

    try {
        const formattedDate = moment(date, ["DD-MM-YY", "DD-MM-YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD");

        if (!formattedDate || formattedDate === "Invalid date") {
            return res.status(400).json({ msg: "Invalid date format. Use DD-MM-YY or YYYY-MM-DD." });
        }

        let event = await EventModel.findOne({ date: formattedDate });

        if (event) {
            event.message = message;
        } else {
            event = new EventModel({ date: formattedDate, message });
        }

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ msg: "Error message!!!", error: error.message });
    }
});

// Get events for a specific month
router.get("/event/:year/:month",auth, async (req, res) => {
    const { year, month } = req.params;

    try {
        const formattedMonth = String(month).padStart(2, "0"); 
        const regexPattern = `^${year}-${formattedMonth}-\\d{2}`;  // Matches full YYYY-MM-DD format

        const events = await EventModel.find({ date: { $regex: regexPattern } });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ msg: "There is an error in fetching events", error: error.message });
    }
});

export default router;
