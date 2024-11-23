import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Links() {
  return (
    <div className='bg-transparent text-white px-6 flex justify-center items-center mb-5'>
      <div className='flex gap-6 justify-center items-center'>
        <a
          href='https://github.com/Rahul6700/wt-project'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-sm px-2 py-1 font-semibold text-white hover:text-gray-400 transition bg-[#25003e] rounded-xl'
        >
          <FaGithub className='text-lg' />
          <span>GitHub</span>
        </a>
        <a
          href='https://another-example.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm font-semibold text-gray-400 hover:text-white transition'
        >
          Website 2
        </a>
      </div>
    </div>
  );
}
