import React, { useState } from 'react';
import './TodoList.css'; // Importing CSS file

const TodoList = () => {
    const [task, setTask] = useState(new Map([
        ["study", "high"],
        ["walking", "imp"]
    ]));

    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("");

    const addTask = () => {
        if (newTask && priority) {
            setTask(prev => {
                const updated = new Map(prev);
                updated.set(newTask, priority);
                return updated;
            });
            setNewTask("");
            setPriority("");
        }
    };

    const deleteTask = (taskName) => {
        setTask(prev => {
            const updated = new Map(prev);
            updated.delete(taskName);
            return updated;
        });
    };

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <ul className="todo-list">
                {Array.from(task.entries()).map(([taskName, priority]) => (
                    <li
                        key={taskName}
                        className={`todo-item ${priority === 'imp' ? 'priority-imp' : priority === 'medium' ? 'priority-medium' : priority === 'high' ? 'priority-high' : ''}`}
                    >
                        <div className="task-info">
                            {taskName}
                            <span className={`priority-badge badge-${priority}`}>{priority}</span>
                        </div>
                        <button className="delete-btn" onClick={() => deleteTask(taskName)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Priority (imp/medium/high)"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                />
                <button className="add-btn" onClick={addTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TodoList;