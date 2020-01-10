import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { games$, updateGames } from '../../global/store/games';

function MyGames() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    const sub = games$.subscribe(updates => setGames(updates));

    axios
      .get(`/api/games/my_games/${user$.value}`)
      .then(response => updateGames(response.data))
      .catch(error => {
        console.error(error.text);
      });

    return () => {
      sub.unsubscribe();
      updateGames(null);
    };
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

  if (!games) {
    return <p>Loading...</p>;
  }

  return <div>{renderList()}</div>;
}

export default MyGames;
