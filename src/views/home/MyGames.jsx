import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';

function MyGames() {
  const [games, updateGames] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/games/my_games/${user$.value}`)
      .then(response => {
        console.log(response);
        updateGames(response.data);
      })
      .catch(error => {
        console.error(error.text);
      });
  }, []);

  const renderList = () => {
    let arr = [];

    for (let gameId in games) {
      let listItem = (
        <li>
          White: {games[gameId].header.White} Black:{' '}
          {games[gameId].header.Black}
          <Link to={`/game/${gameId}`}>
            <button>Play</button>
          </Link>
        </li>
      );
      arr.push(listItem);
    }

    return <ul>{arr}</ul>;
  };

  return <div>{!games ? <p>Loading</p> : renderList()}</div>;
}

export default MyGames;
