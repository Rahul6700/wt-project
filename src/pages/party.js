import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/card.js';
import Answerbox from '../components/answerbox.js';

export default function Party() {
  const { roomCode } = useParams();
  const [cards, setCards] = useState([]);

  // Function to fetch users
  async function fetchUsers(roomId) {
    try {
      const response = await fetch('http://localhost:3000/showUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomId }), // Send the room ID in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json(); // Parse the response as JSON
      setCards(users); // Update the state with the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // useEffect to fetch users when the component is mounted
  useEffect(() => {
    if (roomCode) {
      fetchUsers(roomCode); // Fetch users with the provided roomCode
    }
  }, [roomCode]); // Dependency array ensures this runs when roomCode changes

  // Handle removing a user (kicking out)
  const handleKickOut = (id) => {
    setCards((prevCards) => prevCards.filter((cardId) => cardId !== id));
  };

  return (
    <>
      <div id='party-page'>
        <h1>Welcome to Room: {roomCode}</h1>
      </div>
      <div id='card-holder'>
        {cards.map((cardId) => (
          <Card key={cardId} id={cardId} onKickOut={handleKickOut} />
        ))}
      </div>
      <h4>Share the code so that you can invite your friends!</h4>
      <div id='answer-container'>
        <Answerbox />
      </div>
    </>
  );
}

