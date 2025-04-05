import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import Clock from "./clock.jsx";
import TodoList from "./todo.jsx";
import Calendar from "./calendar.jsx";

// -------- Login Component --------
function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <h2 className="text-4xl font-bold mb-8">🔐 Login</h2>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-green-600 rounded-xl text-lg font-bold hover:bg-green-700 transition"
      >
        Login
      </button>
    </div>
  );
}

// -------- Logout Component --------
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-8 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}

// -------- Home Component --------
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-5xl font-extrabold mb-10 text-center">
        🧠 Welcome to Your Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/clock" className="p-6 bg-gray-800 hover:bg-gray-700 text-center rounded-xl transition transform hover:scale-105">
          <h2 className="text-2xl font-semibold">🕒 Clock</h2>
        </Link>
        <Link to="/todo" className="p-6 bg-gray-800 hover:bg-gray-700 text-center rounded-xl transition transform hover:scale-105">
          <h2 className="text-2xl font-semibold">✅ To-Do List</h2>
        </Link>
        <Link to="/calendar" className="p-6 bg-gray-800 hover:bg-gray-700 text-center rounded-xl transition transform hover:scale-105">
          <h2 className="text-2xl font-semibold">📅 Calendar</h2>
        </Link>
      </div>

      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <Link
          to="/login"
          className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
}

// -------- Main App --------
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
