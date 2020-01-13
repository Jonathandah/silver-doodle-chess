import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { games$, updateGames } from '../../global/store/games';
import GamesList from './GamesList';
import './Home.sass';

import call from '../../global/api/endpoints';

function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    const sub = games$.subscribe(updates => setGames(updates));

    axios
      .get(call.ALL_GAMES())
      .then(response => {
        updateGames(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    return () => {
      sub.unsubscribe();
      updateGames(null);
    };
  }, []);

  if (!games) {
    return (
      <div className="lds-ellipsis home-spinner">
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

export default Home;
