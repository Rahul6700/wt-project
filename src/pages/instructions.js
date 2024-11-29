import React from 'react';

export default function HowToPlay() {
  return (
    <div className='text-white flex flex-col justify-center items-center font-sans p-8'>
      <div className='text-center max-w-4xl'>
        <h1 className='text-4xl font-extrabold mb-6'>
          How to Play <span className='text-blue-400'>Pickaloco</span>
        </h1>
        <p className='text-lg text-gray-300'>
          Pickaloco is a fun game where you and up to three friends guess
          locations based on clues. Here's a quick guide to get started!
        </p>
      </div>

      {/* Steps Section */}
      <div className='mt-8 space-y-8 max-w-4xl'>
        <div className='flex items-start gap-4'>
          <div className='text-blue-400 text-2xl font-bold'>1</div>
          <div>
            <h2 className='text-xl font-bold text-white'>
              Create or Join a Room
            </h2>
            <p className='text-gray-300'>
              Start by creating a room and sharing the room code with your
              friends, or join an existing room using a code.
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='text-blue-400 text-2xl font-bold'>2</div>
          <div>
            <h2 className='text-xl font-bold text-white'>Guess Locations</h2>
            <p className='text-gray-300'>
              Each round, you'll be presented with an image of a location. Type
              the correct answer. The closer your guess, the more points you
              score!
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='text-blue-400 text-2xl font-bold'>3</div>
          <div>
            <h2 className='text-xl font-bold text-white'>
              Compete with Friends
            </h2>
            <p className='text-gray-300'>
              Scores are updated in real-time. See who among your friends can
              guess the most accurately and climb to the top of the leaderboard.
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='text-blue-400 text-2xl font-bold'>4</div>
          <div>
            <h2 className='text-xl font-bold text-white'>Have Fun!</h2>
            <p className='text-gray-300'>
              Enjoy the thrill of the challenge, share laughs with your friends,
              and discover new places virtually.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='mt-12'>
        <button
          className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-500 transition'
          onClick={() => (window.location.href = '/')} 
        >
          Start Playing Now!
        </button>
      </div>
    </div>
  );
}
