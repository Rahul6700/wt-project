import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home({ setUsername }) {
  const [inputCode, setInputCode] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [showRoomControls, setShowRoomControls] = useState(false); 
  const [usernameError, setUsernameError] = useState(''); 
  const navigate = useNavigate();

  const createRoom = async () => {
    const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
    const newRoomCode = generateRoomId();
    try {
      const response = await fetch('http://localhost:3000/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newRoomCode, user: enteredUsername }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      navigate(`/${newRoomCode}`); // Navigate to the new room using the generated code
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create the room. Please try again.');
    }
  };

  const joinRoom = async () => {
    if (inputCode) {
      try {
        const response = await fetch('http://localhost:3000/joinRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: inputCode, user: enteredUsername }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Joined room successfully:', result);
        navigate(`/${inputCode}`);
      } catch (error) {
        console.error('Error joining room:', error);
        alert('Failed to join the room. Please try again.');
      }
    } else {
      alert('Please enter a valid code.');
    }
  };

  const handleUsernameSubmit = () => {
    if (enteredUsername.trim() === '') {
      setUsernameError('Username cannot be empty.');
    } else {
      setUsernameError('');
      setUsername(enteredUsername);
      setShowRoomControls(true);
      console.log(enteredUsername);
    }
  };

  return (
    <div className='bg-gray-900 text-white p-12 mx-auto max-w-3xl text-center rounded-xl shadow-lg'>
      {/* Username input section */}
      {!showRoomControls ? (
        <div className='fade-in-out'>
          <label
            htmlFor='username'
            className='text-lg text-gray-300 mb-4 block'
          >
            Enter your username
          </label>
          <input
            id='username'
            type='text'
            className='bg-gray-700 text-white p-3 rounded-md border border-gray-600 w-2/3 h-11 text-base transition-colors duration-300 focus:bg-gray-600 focus:ring-2 focus:ring-blue-400'
            placeholder='Username goes here'
            value={enteredUsername}
            onChange={(e) => setEnteredUsername(e.target.value)}
            required
            maxLength={20}
          />
          {usernameError && (
            <p className='text-red-500 text-sm mt-2'>{usernameError}</p>
          )}
          <button
            onClick={handleUsernameSubmit}
            className={`bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:bg-blue-400 focus:ring-2 focus:ring-blue-300 mt-6 ml-2 ${enteredUsername.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={enteredUsername.trim() === ''} // Disable the button if username is empty
          >
            Submit
          </button>
        </div>
      ) : (
        <div className='fade-in-out'>
          <button
            className='bg-purple-600 text-white py-4 px-6 rounded-md text-xl font-bold transition-transform duration-300 transform hover:scale-105 hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 mb-8'
            onClick={createRoom}
          >
            Create Room
          </button>

          <div className='relative mb-6'>
            <h1 className='text-xl text-gray-300'>OR</h1>
          </div>

          <div className='flex items-center justify-center gap-4'>
            <textarea
              className='bg-gray-700 text-white p-3 rounded-md border border-gray-600 w-2/3 h-11 text-base transition-colors duration-300 focus:bg-gray-600 focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden'
              placeholder='Enter Code'
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              required
              maxLength={6}
            ></textarea>
            <button
              className='bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:bg-blue-400 focus:ring-2 focus:ring-blue-300'
              onClick={joinRoom}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
