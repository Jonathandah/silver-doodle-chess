import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { games$, updateGames } from '../../global/store/games';
import GamesList from './GamesList';

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
        <li className="Home__myGames__list__item">
          <i className="far fa-square white__player"></i> &nbsp; <b>White Player:</b> &nbsp; {games[gameId].header.White} &nbsp; <i className="fas fa-square black__player"></i> &nbsp; <b>Black Player:</b> &nbsp; {' '}
          {games[gameId].header.Black}
          <Link to={`/game/${gameId}`}>
            <button className="Home__myGames__list__item__button">Play</button>
          </Link>
        </li>
      );
      arr.push(listItem);
    }

    return <ul className="Home__myGames__list">{arr}</ul>;
  };

  if (!games) {
    return <div className="lds-ellipsis myGames-spinner"><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <div className="Home">
      <section className="Home__container">
        <GamesList games={games} />
      </section>
    </div>
  );
}

export default MyGames;
