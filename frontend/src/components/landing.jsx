import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CoverPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to-black text-white">
      <img
        src="/images.png" // 👈 Replace with your actual logo path
        alt="Academic Tracker"
        className="w-70 h-60 mb-6"
      />
      <h1 className="text-4xl font-bold mb-8">📘 Academic Tracker</h1>
      <button
        onClick={handleContinue}
        className="px-6 py-3 bg-blue-600 rounded-xl text-lg font-bold hover:bg-blue-700 transition"
      >
        Continue →
      </button>
    </div>
  );
}
