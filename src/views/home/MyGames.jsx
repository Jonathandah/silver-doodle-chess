import React, { useState, useEffect } from 'react';
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

  if (!games) {
    return (
      <div className="lds-ellipsis myGames-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
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
