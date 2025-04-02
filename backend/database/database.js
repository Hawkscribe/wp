import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Define Todo Schema
const todoSchema = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
});

// Define User Schema
const userSchema = new Schema({
    name: String,
    password: String, 
    email: String,
});

// Define Event Schema
const eventSchema = new Schema({
    date: String,
    message: String,
    notified: { type: Boolean, default: false },
});

// Define Models
const UserModel = mongoose.model("User", userSchema);
const TodoModel = mongoose.model("Todo", todoSchema);
const EventModel = mongoose.model("Event", eventSchema);

// Export models properly
module.exports = {
    TodoModel,
    UserModel,
    EventModel,
};
