import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [username, setUsername] = useState(""); // State to store username
  const [editing, setEditing] = useState(true); // State to toggle between input and display
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setEditing(false); // Switch to display mode
    } else {
      alert("Please enter your username!");
    }
  };

  return (
    <div className="bg-black text-white h-16 flex items-center px-6 shadow-lg">
      <h1 onClick={goToHome} className="text-xl font-semibold cursor-pointer">
        GuessLoc
      </h1>
      <div className="ml-auto text-sm">
        {editing ? (
          <div className="flex items-center gap-2">
            <textarea
              className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 w-48 h-8 text-sm resize-none overflow-hidden focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
            ></textarea>
            <button
              onClick={handleUsernameSubmit}
              className="bg-purple-600 text-white py-1 px-4 rounded-md text-sm font-semibold transition-transform duration-300 transform hover:scale-105 hover:bg-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              Submit
            </button>
          </div>
        ) : (
          <span>
            Welcome, <span className="font-bold">{username}</span>
          </span>
        )}
      </div>
    </div>
  );
}

