import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';

const Chess = require('chess.js');

const Board = () => {
  const [position, setPosition] = useState('start');
  const [squareStyles, setSquareStyles] = useState({});
  const [game, setGame] = useState(null);

  useEffect(() => {
    setGame(new Chess());
  }, []);

  let addHighlight = squares => {
    let toHighlight = squares.reduce((a, c) => {
      return {
        ...a,
        [c]: {
          background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
          borderRadius: '50%'
        }
      };
    }, {});

    setSquareStyles(toHighlight);
  };

  let removeHighlight = () => {
    setSquareStyles({});
  };

  let onMouseOverSquare = square => {
    let moves = game.moves({ square, verbose: true });

    if (!moves.length) {
      return;
    }

    let squaresToHighlight = [];
    moves.forEach(move => squaresToHighlight.push(move.to));

    addHighlight(squaresToHighlight);
  };

  let onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (!move) {
      return;
    }

    setPosition(game.fen());
  };

  return (
    <Chessboard
      position={position}
      onMouseOverSquare={onMouseOverSquare}
      onMouseOutSquare={removeHighlight}
      onDrop={onDrop}
      squareStyles={squareStyles}
      boardStyle={{
        borderRadius: '5px',
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
      }}
    />
  );
};

export default Board;
