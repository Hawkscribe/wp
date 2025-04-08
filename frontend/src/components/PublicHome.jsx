import { Link, useNavigate } from "react-router-dom";


export default function PublicHome() {
  const navigate = useNavigate();

 const handleContinue = () => {
  navigate("/home");
 };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-5xl font-bold mb-8">🎉 Welcome to Your Productivity App</h1>
      <p className="mb-6 text-xl">Track tasks, manage events, and stay on schedule.</p>
      <button 
      onClick={handleContinue}
      className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}
