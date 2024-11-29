import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Room from './pages/room';
import Instructions from './pages/instructions';
import About from './pages/about.js';

export default function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route
              path='/'
              element={
                <div className='flex flex-col justify-center items-center h-[80vh] text-white text-center'>
                  <h1 className='text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 mb-4'>
                    PICKALOCO
                  </h1>
                  <Home setUsername={setUsername} />
                  <div className='max-w-xl mt-6 text-gray-400'>
                    <p className='text-lg'>
                      <strong>Pickaloco</strong> is a fun and interactive game
                      where you and up to three friends compete to guess
                      locations!
                    </p>
                    <p className='mt-1'>
                      Each round, you'll be presented with clues, and your task
                      is to guess the location as accurately as possible. Scores
                      are tracked in real-time, and the player with the highest
                      score wins!
                    </p>
                    <p className='mt-1'>
                      Invite your friends, share the room code, and let the
                      adventure begin!
                    </p>
                  </div>
                </div>
              }
            />
            <Route path='/:roomCode' element={<Room username={username} />} />
            <Route path='/how-to-play' element={<Instructions />} />
            <Route path='/about-us' element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
