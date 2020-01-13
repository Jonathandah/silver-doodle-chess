import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { user$ } from '../../global/store/userStore';
import axios from 'axios';
import call from '../../global/api/endpoints';
import { Redirect } from 'react-router-dom';

const GamesList = ({ games }) => {
  const [joinGame, updateJoinGame] = useState(false);

  const checkJoinability = (gameId, game) => {
    if (
      (!game.header.Black || !game.header.White) &&
      game.owner !== user$.value
    ) {
      return (
        <button
          className="Home__container__list__item__button"
          onClick={() => {
            axios
              .post(call.JOIN_GAME(gameId), { username: user$.value })
              .then(updateJoinGame(gameId))
              .catch(error => console.error(error));
          }}
        >
          Join
        </button>
      );
    } else if (
      game.header.Black === user$.value ||
      game.header.White === user$.value
    ) {
      return (
        <Link to={`/game/${gameId}`}>
          <button className="Home__container__list__item__button">Play</button>
        </Link>
      );
    } else {
      return null;
    }
  };

  const renderListElements = () =>
    Object.keys(games).map((gameId, idx) => {
      const game = games[gameId];

      return (
        <li className="Home__container__list__item" key={idx}>
          <p className="Home__container__list__item__owner">
          <i className="far fa-square white__player"></i> &nbsp;<b>White Player: </b> {game.header.White || '-'} &nbsp; <i className="fas fa-square black__player"></i> &nbsp;<b>Black player:</b> {game.header.Black || '-'}
          </p>
          {checkJoinability(gameId, game)}
        </li>
      );
    });

  if (joinGame) {
    return <Redirect to={`/game/${joinGame}`} />;
  }
  return <ul className="Home__container__list">{renderListElements()}</ul>;
};

export default GamesList;
