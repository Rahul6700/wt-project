import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar.js';
import Answerbox from '../components/answerbox.js';

export default function Party() {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);

  async function fetchUsers(roomId) {
    try {
      const response = await fetch('http://localhost:3000/showUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomId }), // Send the room ID in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      console.log('Fetched users:', users); // Debugging log
      setPlayers(users); // Update the state with the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // useEffect to fetch users when the component is mounted and set up polling
  useEffect(() => {
    if (roomCode) {
      fetchUsers(roomCode); // Initial fetch on mount
      const intervalId = setInterval(() => {
        fetchUsers(roomCode); // Poll every 5 seconds for new users
      }, 5000);

      // Clean up the interval when the component is unmounted or roomCode changes
      return () => clearInterval(intervalId);
    }
  }, [roomCode]);

  return (
    <>
      <div
        id="party-page"
        className="text-white flex justify-center items-center font-sans"
      >
        <h1 className="text-4xl font-extrabold">Welcome to Room: {roomCode}</h1>
      </div>
      <div>
        <Sidebar items={players} /> {/* Pass the players data to Sidebar */}
      </div>
      <h4 className="flex justify-center items-center text-white text-lg font-sans">
        Share the code so that you can invite your friends!
      </h4>
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-900 flex justify-center">
        <Answerbox />
      </div>
    </>
  );
}

