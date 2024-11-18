import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ username }) {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className='bg-black text-white h-16 flex items-center px-6 shadow-lg'>
      <h1 onClick={goToHome} className='text-xl font-semibold cursor-pointer'>
        GuessLoc
      </h1>
      <div className='ml-auto text-sm'>
        <span>Welcome,</span> <span className='font-bold'>{username}</span>
      </div>
    </div>
  );
}
