import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const todoSchema = new Schema({
    task: String,  
    priority: String, 
    done: { type: Boolean, default: false }, 
    userId: ObjectId,
});

const userSchema = new Schema({
    name: String,
    password: String, 
    email: String,
});

const eventSchema = new Schema({
    date: String,
    message: String,
    notified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);
const TodoModel = mongoose.model("Todo", todoSchema);
const EventModel = mongoose.model("Event", eventSchema);

// Export models properly
export { TodoModel, UserModel, EventModel };
