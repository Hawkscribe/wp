import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Clock from "./components/Clock.js";
import TodoList from "./components/TodoList.js";
import Calendar from "./components/Calendar.js";
import Login from "./components/Login.js";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/clock" className="p-6 bg-white shadow-lg rounded-xl hover:bg-gray-200 text-center">
          <h2 className="text-2xl font-bold">Clock</h2>
        </Link>
        <Link to="/todo" className="p-6 bg-white shadow-lg rounded-xl hover:bg-gray-200 text-center">
          <h2 className="text-2xl font-bold">To-Do List</h2>
        </Link>
        <Link to="/calendar" className="p-6 bg-white shadow-lg rounded-xl hover:bg-gray-200 text-center">
          <h2 className="text-2xl font-bold">Calendar</h2>
        </Link>
      </div>
      <Link to="/login" className="mt-6 p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
        Login
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
