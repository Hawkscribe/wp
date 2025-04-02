import express from 'express';
import { TodoModel } from '../database/todo';
import { auth } from '../middleware';
const router = express.Router();

// Get all tasks
router.get('/list',auth, async (req, res) => {
    try {
        const tasks = await TodoModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

// Add a new task
router.post('/give', auth,async (req, res) => {
    try {
        const { tasks, priority } = req.body;
        const newTask = new TodoModel({ task: tasks, priority });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error adding task" });
    }
});

// Delete a task
router.delete('/del/:id',auth, async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.json({ msg: "Task removed!!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting task" });
    }
});

export default router;
