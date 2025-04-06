import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { auth } from "../middleware.js";
import dotenv from "dotenv";  
dotenv.config();  

import mongoose from "mongoose";
import { UserModel } from "../database/database.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;  

// Sign up
router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;

    try {
      
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({ msg: "User has been registered" });
    } catch (error) {
        res.status(400).json({ msg: "Error in registration", error: error.message });
    }
});

// Sign in
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Error signing in", error: error.message });
    }
});

export default router;
