import React from "react";
import { useParams } from 'react-router-dom';
export default function Sidebar({ items }) {
  const { roomCode } = useParams()
  return (
    <div className="h-screen w-64 bg-gray-900 text-white shadow-xl rounded-b-xl fixed top-16">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Code: {roomCode}</h2>
      </div>
      <ul className="p-4 space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}


