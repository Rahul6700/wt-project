import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Sidebar({ items }) {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white shadow-xl rounded-b-xl fixed top-16 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-gray-300">Code: {roomCode}</h2>
      </div>
      <ul className="p-4 space-y-2 flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          >
            {item.username} {/* Display username */}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => navigate('/')} // Correct usage of navigate function
        className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 transition mb-6"
      >
        Back
      </button>
    </div>
  );
}

