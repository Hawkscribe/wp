import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Clock from "./components/Clock";
import TodoList from "./components/TodoList";
import Calendar from "./components/Calendar";

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login Page</h2>
      <button 
        onClick={handleLogin} 
        className="p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
      >
        Login
      </button>
    </div>
  );
}

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <button 
      onClick={handleLogout} 
      className="mt-6 p-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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
      {isLoggedIn ? <Logout /> : (
        <Link to="/login" className="mt-6 p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Login
        </Link>
      )}
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
