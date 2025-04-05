import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Clock from "./components/clock.jsx";
import TodoList from "./components/todo.jsx";
import Calendar from "./components/calendar.jsx";
import Login from "./components/login.jsx";
import Landing from "./components/landing.jsx";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6">
      <h1 className="text-5xl font-extrabold mb-10 text-center tracking-tight">
        Welcome to Your Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link to="/clock" className="transform transition hover:scale-105 duration-300 bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold">🕒 Clock</h2>
        </Link>
        <Link to="/todo" className="transform transition hover:scale-105 duration-300 bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold">✅ To-Do List</h2>
        </Link>
        <Link to="/calendar" className="transform transition hover:scale-105 duration-300 bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold">📅 Calendar</h2>
        </Link>
      </div>

      <Link
        to="/login"
        className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-full shadow-lg transition-colors duration-300"
      >
        🔐 Login
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
