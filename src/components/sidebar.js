import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons

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

        // Set players if the structure is correct
        setPlayers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (roomCode) {
      fetchUsers();
      const intervalId = setInterval(() => fetchUsers(), 1000); // Poll for updates every second

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [roomCode]);

  // Handle delete room request
  const deleteRoom = async () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this room? This action cannot be undone.',
    );

    if (userConfirmed) {
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
    } else {
      console.log('Room deletion canceled.');
    }
  };

  return (
    <div className='h-screen w-64 bg-gray-800 text-white shadow-xl rounded-b-xl fixed top-16 flex flex-col'>
      <div className='p-4 border-b border-gray-700 flex justify-between items-center'>
        <h2 className='text-lg font-bold text-gray-300'>Code: {roomCode}</h2>
        <button
          onClick={deleteRoom}
          className='text-red-500 hover:text-red-400 transition'
          title='Delete Room'
        >
          <FaTrash className='text-lg' />
        </button>
      </div>
      <ul className='p-4 space-y-2 flex-1 overflow-y-auto'>
        {/* Accessing the 'user' property, not 'username' */}
        {players.map((player, index) => (
          <li
            key={index}
            className='p-2 rounded-md hover:bg-gray-700 cursor-pointer'
          >
            <span className='block font-bold'>{player.user || 'Unknown'}</span>{' '}
            {/* Use player.user */}
            <span className='block text-sm text-gray-400'>
              Score: {player.score || 0} {/* Default score to 0 if undefined */}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
