import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import axios from 'axios';
import io from 'socket.io-client';
import { user$ } from '../../global/store/userStore';
import './Board.sass';

const socket = io('http://localhost:8000');

const Chess = require('chess.js');

const chess = new Chess();

const Board = ({ setGameInfo, setCurrentPlayer }) => {
  const [position, setPosition] = useState(null);
  const [squareStyles, setSquareStyles] = useState({});
  const [game, setGame] = useState(null);
  const [check, setCheck] = useState(false);
  const [gameOver, setGameOver] = useState({
    checkmate: false,
    draw: false,
    stalemate: false
  });

  const { gameId } = useParams();

  useEffect(() => {
    socket.on('new_move', data => {
      setPosition(data.board);
      chess.load(data.board);
      setGameOver({
        checkmate: chess.in_checkmate(),
        draw: chess.in_draw(),
        stalemate: chess.in_stalemate()
      });
      setCheck(chess.in_check());
      setCurrentPlayer(chess.turn());
    });

    axios.get(`/api/games/${gameId}`).then(res => {
      const data = Object.values(res.data)[0];

      setGame(data);
      setPosition(data.board);
      chess.load(data.board);
      setCurrentPlayer(chess.turn());
      setGameInfo(data.header);
      setGameOver({
        checkmate: chess.in_checkmate(),
        draw: chess.in_draw(),
        stalemate: chess.in_stalemate()
      });
      setCheck(chess.in_check());
    });

    return () => {
      socket.off('new_move');
    };
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
    let moves = chess.moves({ square, verbose: true });
    if (!moves.length) {
      return;
    }

    let squaresToHighlight = [];
    moves.forEach(move => squaresToHighlight.push(move.to));
    addHighlight(squaresToHighlight);
  };

  let onDrop = ({ sourceSquare, targetSquare }) => {
    let move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (!move) {
      return;
    }

    const board = chess.fen();
    axios
      .post(`/api/games/${gameId}/move`, { board })
      .then(res => {
        setCurrentPlayer(chess.turn());
      })
      .catch(error => {
        console.error(error);
        chess.undo();
        setPosition(chess.fen());
      });
  };

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Board">
      <div className="Board__container">
        {gameOver.checkmate ? (
          <p className="Board__container__GameOver">Checkmate</p>
        ) : gameOver.draw ? (
          <p className="Board__container__GameOver">It's a draw</p>
        ) : gameOver.stalemate ? (
          <p className="Board__container__GameOver">Stalemate</p>
        ) : check ? (
          <p className="Board__container__GameOver">Check</p>
        ) : null}
      </div>
      <Chessboard
        position={position}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={removeHighlight}
        onDrop={onDrop}
        draggable={
          (chess.turn() === 'w' && game.header.White === user$.value) ||
          (chess.turn() === 'b' && game.header.Black === user$.value)
        }
        squareStyles={squareStyles}
        boardStyle={{
          borderRadius: '5px',
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        }}
      />
    </div>
  );
};

export default Board;
