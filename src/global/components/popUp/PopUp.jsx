import React from 'react';
import './PopUp.sass';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import { user$ } from '../../store/userStore';
import { updateGames } from '../../store/games';
import moment from 'moment';
import Join from './Join';
import Create from './Create';
import call from '../../api/endpoints';

const Chess = require('chess.js');


const PopUp = ({ info, updateShowPopUp }) => {
  console.log(info);
  const [formState, { radio, label }] = useFormState();

  function doRequest(e) {
    if (e.target.value == 'Join') {
      axios
        .post(call.JOIN_GAME(info.join.id), { username: user$.value })
        .then(response => {
          updateShowPopUp({ join: false, create: false });
        });
    } else {
      let newGame = {
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
          updateShowPopUp({ join: false, create: false });

          const { pathname } = window.location;
          if (pathname === '/') {
            return axios.get(call.ALL_GAMES());
          } else if (pathname === '/my_games') {
            return axios.get(call.USER_GAMES(user$.value));
          }
        })
        .then(res => updateGames(res.data));
    }
  }

  return (
    <div className="PopUp">
      <section className="PopUp__section">
        <div className="PopUp__section__container">
          {info.join ? (
            <Join info={info} />
          ) : (
              <Create label={label} radio={radio} />
            )}
        </div>

        <nav className="PopUp__section__nav">
          <button
            className="PopUp__section__nav__button"
            value={info.join ? 'Join' : 'Create Game'}
            onClick={e => doRequest(e)}
          >
            {info.join ? 'Join' : 'Create Game'}
          </button>
          <button
            className="PopUp__section__nav__button"
            onClick={() => updateShowPopUp({ join: false, create: false })}
          >
            Cancel
          </button>
        </nav>
      </section>
    </div>
  );
};

export default PopUp;
