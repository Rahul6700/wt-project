import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createParty = () => {
    const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
    const newRoomCode = generateRoomId();
    setLoading(true);
    setTimeout(() => {
      navigate(`/${newRoomCode}`);
    }, 2000);
  };

  const handleCode = () => {
    if (inputCode) {
      setLoading(true);
      setTimeout(() => {
        navigate(`/${inputCode}`);
      }, 2000);
    } else {
      alert('Please enter a valid code.');
    }
  };

  return (
    <>
      <div className='bg-gray-900 text-white p-12 mx-auto max-w-3xl text-center rounded-xl shadow-lg'>
        <button
          className='bg-purple-600 text-white py-4 px-6 rounded-md text-xl font-bold transition-transform duration-300 transform hover:scale-105 hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 mb-8'
          onClick={createParty}
          disabled={loading}
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
            onClick={handleCode}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
