import React, { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("low");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/api/todo/list", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    fetch("http://localhost:8000/api/todo/give", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ task: taskInput, priority })
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data.task]);
        setTaskInput("");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/todo/del/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    })
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">✅ To-Do List</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white w-full"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <span>
              {task.task}{" "}
              <span className="text-sm text-gray-400">({task.priority})</span>
            </span>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
