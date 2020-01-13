import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { user$ } from '../../global/store/userStore';
import axios from "axios"
import call from "../../global/api/endpoints"
import { Redirect } from "react-router-dom"

const GamesList = ({ games }) => {
  games = {

    1: {
      header: { Black: null, White: "Yaro", Date: "2019-01-02" },
      board: "1",
      owner: "Yaro"
    },

    2: {
      header: { Black: "Emma", White: "Yaro", Date: "2019-01-02" },
      board: "2",
      owner: "Emma"
    },

    3: {
      header: { Black: "Joanna", White: null, Date: "2019-01-02" },
      board: "3",
      owner: "Joanna"
    },

    4: {
      header: { Black: "Jonathan", White: "Joanna", Date: "2019-01-02" },
      board: "4",
      owner: "Jonathan"
    },

  }
  const [joinGame, updateJoinGame] = useState(false)

  const checkJoinability = (gameId, game) => {
    if ((!game.header.Black || !game.header.White) &&
      game.owner !== user$.value) {
      return (
        <button
          className="Home__container__list__item__button"
          onClick={() => {
            axios.post(call.JOIN_GAME(gameId), { username: user$.value }).then(
              updateJoinGame(gameId)
            )
          }}
        >
          Join
</button>
      )
    } else if (game.header.Black === user$.value ||
      game.header.White === user$.value) {
      return (
        <Link to={`/game/${gameId}`}>
          <button className="Home__container__list__item__button">
            Play
    </button>
        </Link>
      )
    }
  }

  const renderListElements = () => Object.keys(games).map((gameId, idx) => {
    const game = games[gameId];

    return <li className="Home__container__list__item" key={idx}>
      <p className="Home__container__list__item__owner">{game.owner}</p>
      {checkJoinability(gameId, game)}
    </li>
  });


  if (joinGame) {
    return <Redirect to={`/game/${joinGame}`} />
  }
  return (
    <ul className="Home__container__list">
      {renderListElements()}
    </ul>
  );
};

export default GamesList;
