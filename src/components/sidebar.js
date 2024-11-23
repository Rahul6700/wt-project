import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  // Fetch users when the component is mounted or when roomCode changes
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/showUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: roomCode }), // Send the room ID in the request body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        setPlayers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (roomCode) {
      fetchUsers();
      const intervalId = setInterval(() => fetchUsers(), 2000);

      return () => clearInterval(intervalId);
    }
  }, [roomCode]);

  // Handle delete room request
  const deleteRoom = async () => {
    try {
      const response = await fetch('http://localhost:3000/deleteRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      navigate('/');
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white shadow-xl rounded-b-xl fixed top-16 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-gray-300">Code: {roomCode}</h2>
      </div>
      <ul className="p-4 space-y-2 flex-1 overflow-y-auto">
        {players.map((player, index) => (
          <li
            key={index}
            className="p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <span className="block font-bold">{player.username}</span>
            <span className="block text-sm text-gray-400">Score: {player.score}</span>
          </li>
        ))}
      </ul>
      <div className="p-4 mt-10"> {/* Added mt-auto to push the button to the bottom */}
        <button
          onClick={deleteRoom}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 focus:ring-2 focus:ring-red-400 transition"
        >
          Delete Room
        </button>
      </div>
    </div>
  );
}

