import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "../App";
export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // Only for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const url = isLogin
      ? "http://localhost:8000/api/user/signin"
      : "http://localhost:8000/api/user/signup";
    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await axios.post(url, payload);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        alert("🎉 Signup successful! Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      alert(`❌ ${isLogin ? "Login" : "Signup"} failed: ${err.response?.data?.msg}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-xl font-bold ${
              isLogin ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-xl font-bold ${
              !isLogin ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "🔐 Login" : "📝 Signup"}
        </h2>

        {!isLogin && (
          <input
            className="w-full p-3 mb-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="w-full p-3 mb-4 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 mb-6 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 rounded-xl font-bold"
          onClick={handleAuth}
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
}
