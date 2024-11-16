import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/card.js";
import Answerbox from "../components/answerbox.js";

export default function Party() {
  const { roomCode } = useParams();
  const [cards, setCards] = useState([1, 2, 3, 4]);

  const handleKickOut = (id) => {
    setCards((prevCards) => prevCards.filter(cardId => cardId !== id));
  };

  return (
    <>
      <div id="party-page">
        <h1>Welcome to Room: {roomCode}</h1>
      </div>
      <div id="card-holder">
        {cards.map((cardId) => (
          <Card key={cardId} id={cardId} onKickOut={handleKickOut} />
        ))}
      </div>
      <h4>Share the code so that you can invite your friends!</h4>
      <div id="answer-container">
        <Answerbox />
      </div>
    </>
  );
}


