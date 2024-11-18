import React from 'react';

export default function Card({ id, onKickOut }) {
  return (
    <div id='card-container'>
      <h3>{id}</h3>
      <button onClick={() => onKickOut(id)}>Kick Out</button>
    </div>
  );
}
