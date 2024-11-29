import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className='bg-gray-950 text-white h-16 flex items-center px-6 shadow-xl justify-between'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-extrabold cursor-pointer transition-transform transform hover:scale-105 hover:text-gray-300'>
          PICKALOCO
        </h1>
        <div className='ml-10 flex gap-6'>
          <button
            onClick={() => (window.location.href = '/')}
            className='text-sm font-semibold text-gray-400 hover:text-white transition'
          >
            Home
          </button>
          <button
            onClick={() => (window.location.href = '/how-to-play')}
            className='text-sm font-semibold text-gray-400 hover:text-white transition'
          >
            How to Play
          </button>
          <button
            onClick={() => (window.location.href = '/about-us')}
            className='text-sm font-semibold text-gray-400 hover:text-white transition'
          >
            About
          </button>
        </div>
      </div>
      <a
        href='https://github.com/Rahul6700/wt-project'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 text-sm px-2 py-1 font-semibold text-white hover:text-gray-400 transition bg-[#25003a] rounded-xl'
      >
        <FaGithub className='text-lg' />
        <span>GitHub</span>
      </a>
    </div>
  );
}
