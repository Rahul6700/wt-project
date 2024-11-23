import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ username, setUsername }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className='bg-gradient-to-r from-black to-gray-900 text-white h-16 flex items-center px-6 shadow-xl rounded-b-lg'>
      <h1
        onClick={goToHome}
        className='text-2xl font-extrabold cursor-pointer transition-transform transform hover:scale-105 hover:text-gray-400'
      >
        guessloc
      </h1>
      <div className='ml-auto text-sm'>
        <div className='flex items-center gap-2'>
          <span className='text-lg font-semibold text-gray-500'>Guest</span>
        </div>
      </div>
    </div>
  );
}
