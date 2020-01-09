import React from 'react';
import { user$ } from '../../global/store/userStore';
import axios from 'axios';

const GamesList = ({ games, game, showPopUp, updateShowPopUp, index }) => {
  return (
    <li className="Home__container__list__item">
      <p className="Home__container__list__item__owner">{game.owner}</p>
      {game.header.Black !== user$.value ||
      game.header.White !== user$.value ? (
        <button
          className="Home__container__list__item__button"
          onClick={() => {
            updateShowPopUp({
              ...showPopUp,
              join: {
                game,
                id: Object.keys(games.data)[index]
              }
            });
          }}
        >
          Join
        </button>
      ) : (
        <button
          className="Home__container__list__item__button"
          onClick={() => {
            axios.updateGameBoard(true);
          }}
        >
          Play
        </button>
      )}
    </li>
  );
};

export default GamesList;
