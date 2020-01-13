import React from 'react';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import { user$ } from '../../store/userStore';
import { updateGames } from '../../store/games';
import moment from 'moment';
import Create from './Create';
import call from '../../api/endpoints';
import './PopUp.sass';

const Chess = require('chess.js');

const PopUp = ({ updateShowPopUp }) => {
  const [formState, { radio, label }] = useFormState();

  function doRequest() {
    const newGame = {
      header: {
        Black: null,
        White: null,
        Date: moment().format('YYYY-MM-DD')
      },
      board: new Chess().fen(),
      owner: user$.value
    };

    newGame.header[formState.values.color] = user$.value;

    axios
      .post(call.ADD_NEW_GAME(), newGame)
      .then(response => {
        updateShowPopUp(false);

        const { pathname } = window.location;
        if (pathname === '/') {
          return axios.get(call.ALL_GAMES());
        } else if (pathname === '/my_games') {
          return axios.get(call.USER_GAMES(user$.value));
        }
      })
      .then(res => updateGames(res.data))
      .catch(error => console.error(error));
  }

  return (
    <div className="PopUp">
      <section className="PopUp__section">
        <div className="PopUp__section__container">
          <p className="PopUp__section__container__title">Pick your color <i className="fas fa-chess-rook"></i></p>
          <Create label={label} radio={radio} />
        </div>

        <nav className="PopUp__section__nav">
          <button className="PopUp__section__nav__button--createGame" onClick={doRequest}>
            Create Game
          </button>
          <button
            className="PopUp__section__nav__button--cancel"
            onClick={() => updateShowPopUp(false)}
          >
            Cancel
          </button>
        </nav>
      </section>
    </div>
  );
};

export default PopUp;
