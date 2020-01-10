import React, { useState } from 'react';
import Board from './Board.jsx';
import Turn from './Turn.jsx';
import './GameBoard.sass';

function GameBoard() {
  const [gameInfo, setGameInfo] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState('');

  return (
    <div className="Game">
      <div className="Game__container">
        <Turn
          className="Game__turn"
          gameInfo={gameInfo}
          currentPlayer={currentPlayer}
        />

        <Board
          setCurrentPlayer={setCurrentPlayer}
          setGameInfo={setGameInfo}
          className="Game__board"
        />
      </div>
    </div>
  );
}

export default GameBoard;
