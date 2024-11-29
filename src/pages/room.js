import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar.js';
import Answerbox from '../components/answerbox.js';

export default function Room({ username }) {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [userScore, setUserScore] = useState(0); // State to store the player's score

  // Fetch users in the room
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
      setPlayers(users); // Update the state with the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Fetch image data from the server
  async function fetchImage() {
    try {
      const response = await fetch('http://localhost:3000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomCode }), // Send the room ID in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImageData(data); // Update the state with the fetched image
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  // Handle user's guess and update score
  async function handleGuess(guess) {
    if (imageData && imageData.answer === guess) {
      try {
        // Send the guess to the backend for validation
        const response = await fetch('http://localhost:3000/guess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: roomCode,
            guess: guess,
            user: username, // Use the username passed as a prop
            currentImage: imageData,
          }),
        });

        if (response.ok) {
          alert('Correct guess!'); // Optionally show a message
        } else {
          alert('Incorrect guess, try again!');
        }
      } catch (error) {
        console.error('Error handling guess:', error);
        alert('Error handling guess.');
      }
    } else {
      alert('Incorrect guess, try again!');
    }
  }

  // Fetch users and images on mount, and set up polling
  useEffect(() => {
    if (roomCode) {
      fetchUsers(roomCode);
      fetchImage();
      const intervalId = setInterval(() => {
        fetchUsers(roomCode);
      }, 5000);

      return () => clearInterval(intervalId); // Cleanup on unmount or roomCode change
    }
  }, [roomCode]);

  return (
    <>
      <div
        id='party-page'
        className='text-white flex justify-center items-center font-sans flex-grow p-8'
      >
        <div>
          <h1 className='text-4xl font-extrabold mb-4'>
            Welcome to Room: {roomCode}
          </h1>
          <h4 className='text-lg text-white'>
            Share the code to invite your friends!
          </h4>
        </div>
      </div>

      {/* Sidebar */}
      <div className='absolute left-0 top-16'>
        <Sidebar items={players} />
      </div>

      {/* Image Display */}
      <div className='flex flex-col items-center mt-8'>
        {imageData ? (
          <div className='text-center'>
            <div className='w-[640px] h-[480px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center shadow-lg'>
              <img
                src={imageData.url}
                alt='Game Image'
                className='object-contain w-full h-full'
              />
            </div>
            <button
              onClick={fetchImage}
              className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition'
            >
              Next Image
            </button>
          </div>
        ) : (
          <p className='text-gray-400'>Loading image...</p>
        )}
      </div>

      {/* Pass the handleGuess function to Answerbox */}
      <div className='fixed bottom-0 left-0 w-full z-30'>
        <Answerbox onGuess={handleGuess} />
      </div>
    </>
  );
}
