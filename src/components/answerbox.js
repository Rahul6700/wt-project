import React, { useState } from 'react';

export default function Answerbox({ onGuess }) {
  const [guess, setGuess] = useState('');

  // Handle guess submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess); // Call the passed onGuess function
      setGuess(''); // Clear the input field after submission
    } else {
      alert('Please enter a guess');
    }
  };

  return (
    <div className="bg-[#0f0f0f] border-t border-[#333] shadow-lg rounded-md w-full p-2">
      <div className="max-w-3xl mx-auto flex items-center gap-2 p-4">
        <textarea
          className="flex-grow h-12 bg-[#1a1a1a] text-white border border-[#333] rounded-md p-2 text-base font-sans resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
          placeholder="Enter your answer here!"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        ></textarea>
        <button
          className="h-12 px-5 bg-blue-600 text-white rounded-md cursor-pointer text-base transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
}

