import React from 'react';
import { user$ } from '../../global/store/userStore';
import './Turn.sass';

function Turn({ gameInfo, currentPlayer }) {
  let player;
  if (currentPlayer === 'w') {
    player = gameInfo.White || 'Opponent';
  } else if (currentPlayer === 'b') {
    player = gameInfo.Black || 'Opponent';
  }

  return (
    <div className="Turn">
      {!gameInfo.White || !gameInfo.Black ? (
        <p className="Turn__waiting">Waiting for opponent to connect.</p>
      ) : null}
      {player === user$.value ? (
        <p className="Turn__player">Your turn!</p>
      ) : (
        <p className="Turn__player">{player}´s turn!</p>
      )}
    </div>
  );
}

export default Turn;
