import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';

export default function Home() {
    const [roomCode, setRoomCode] = useState(''); //the room code that is created
    const [inputCode, setInputCode] = useState(''); //the user input in textarea

    const createParty = () => {
        const generateRoomId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        setRoomCode(generateRoomId());
    };

    const handleCode = () => {
        // logic to reroute if the code is correct else error handling
    };

    return (
  <div id="container">
    <button id="btn-create-party" onClick={createParty}>
      Create Party
    </button>
    {roomCode && <h2 id="room-code">Room Code: {roomCode}</h2>}
    <h1 id="or-text">OR</h1>
    <div id="flex-container">
      <textarea
        id="textarea-input"
        placeholder="Enter code"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <button id="btn-submit" onClick={handleCode}>
        Submit
      </button>
    </div>
  </div>
   );
}
