import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ username }) {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-950 text-white h-16 flex items-center px-6 shadow-xl rounded-b-lg'>
      <h1 className='text-2xl font-extrabold cursor-pointer transition-transform transform hover:scale-105 hover:text-gray-300'>
        PICKALOCO
      </h1>
      <div className='ml-10 flex gap-6'>
        <button
          onClick={() => navigate('/')}
          className='text-sm font-semibold text-gray-400 hover:text-white transition'
        >
          Home
        </button>
        <button
          onClick={() => navigate('/how-to-play')}
          className='text-sm font-semibold text-gray-400 hover:text-white transition'
        >
          How to Play
        </button>
        <button
          onClick={() => navigate('/about-us')}
          className='text-sm font-semibold text-gray-400 hover:text-white transition'
        >
          About
        </button>
      </div>

      {/* Username Section */}
      <div className='ml-auto text-sm'>
        <div className='flex items-center gap-2'>
          <span className='text-lg font-semibold text-gray-500'>
            {username || 'Guest'} {/* Display the username or Guest */}
          </span>
        </div>
      </div>
    </div>
  );
}
