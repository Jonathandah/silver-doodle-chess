import React, { useEffect, useState } from 'react';
import Board from './Board.jsx';

function Game(user) {
  return (
    <div className="Game">
      <Board />
    </div>
  );
}

export default Game;
