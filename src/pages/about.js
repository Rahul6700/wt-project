import React from 'react';
import { useNavigate } from 'react-router-dom';
import dev2Image from '../images/dev2.png'; // Adjust the path to where your images are stored
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa";
export default function About() {
  const navigate = useNavigate();
  return (
    <div className='text-white flex flex-col justify-center items-center font-sans p-8'>
      <div className='mt-8 space-y-8 max-w-4xl'>
        <div className='flex justify-around gap-10'>
          <div className='flex flex-col items-center'>
            <div className='w-32 h-32 rounded-full bg-gray-600 overflow-hidden'>
              {/* Developer 1's image */}
            </div>
            <p className='text-white mt-4'>Ashish Pavan</p>
            <div className='flex gap-4 mt-2'>
              <a href='https://github.com/ashishpavan1819' target='_blank' rel='noopener noreferrer'>
                <button>
                  <FaGithub className="text-white text-xl"/>
                </button>
              </a>
              <a href='https://www.linkedin.com/in/ashish-pavan-8861042a3/' target='_blank' rel='noopener noreferrer'>
                <button>
                  <FaLinkedin className="text-white text-xl"/>
                </button>
              </a>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <div className='w-32 h-32 rounded-full bg-gray-600 overflow-hidden'>
              <img src={dev2Image} alt='Ram Prakhyath' className='w-full h-full object-cover' />
            </div>
            <p className='text-white mt-4'>Ram Prakhyath</p>
            <div className='flex gap-4 mt-2'>
              <a href='https://github.com/RamPrakhyath05' target='_blank' rel='noopener noreferrer'>
                <button>
                  <FaGithub className="text-white text-xl"/>
                </button>
              </a>
              <a href='https://www.linkedin.com/in/ram-prakhyath-annamreddy/' target='_blank' rel='noopener noreferrer'>
                <button>
                  <FaLinkedin className="text-white text-xl"/>
                </button>
              </a>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <div className='w-32 h-32 rounded-full bg-gray-600 overflow-hidden'>
              {/* Developer 3's image */}
            </div>
            <p className='text-white mt-4'>Rahul Senthil Kumar</p>
            <div className='flex gap-4 mt-2'>
              <a href='https://github.com/Rahul6700' target='_blank' rel='noopener noreferrer'>
                <button>
                  <FaGithub className="text-white text-xl"/>
                </button>
              </a>
              <a href='https://www.linkedin.com/in/rahul-senthil-kumar-576621294/' target='_blank' rel='noopener noreferrer'>
                <button>
                   <FaLinkedin className="text-white text-xl"/>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 text-center'>
        <h2 className='text-2xl font-bold mb-4'>About Us</h2>
        <p className='text-lg text-gray-300'>
          We are a team of passionate developers who created Pickaloco as a fun and engaging way to test your knowledge of locations. Our goal is to provide an interactive and enjoyable experience for players of all ages.
          Have Fun!!
        </p>
      </div>

      <div className='mt-12'>
        <button
          className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-500 transition'
          onClick={() => navigate('/')} 
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

