import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { user$ } from '../../global/store/userStore';
import axios from "axios"
import call from "../../global/api/endpoints"
import { Redirect } from "react-router-dom"


const GamesList = ({ games }) => {
  const [joinGame, updateJoinGame] = useState(false)

  if (joinGame) {
    return <Redirect to={`/game/${joinGame}`} />
  }
  return (
    <ul className="Home__container__list">
      {Object.keys(games).reduce((acc, cur, idx) => {
        const game = games[cur];

        acc.push(
          <li className="Home__container__list__item" key={idx}>
            <p className="Home__container__list__item__owner">{game.owner}</p>
            {(!game.header.Black || !game.header.White) &&
              game.owner !== user$.value ? (
                <button
                  className="Home__container__list__item__button"
                  onClick={() => {
                    axios.post(call.JOIN_GAME(cur), { username: user$.value }).then(
                      updateJoinGame(cur)
                    )
                  }}
                >
                  Join
              </button>
              ) : game.header.Black === user$.value ||
                game.header.White === user$.value ? (
                  <Link to={`/game/${cur}`}>
                    <button className="Home__container__list__item__button">
                      Play
                </button>
                  </Link>
                ) : null}
          </li>
        );

        return acc;
      }, [])}
    </ul>
  );
};

export default GamesList;
