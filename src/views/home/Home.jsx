import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { games$, updateGames } from '../../global/store/games';
import { Redirect } from 'react-router-dom';
import PopUp from '../../global/components/popUp/PopUp';
import GamesList from './GamesList';
import './Home.sass';

import call from '../../global/api/endpoints';

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
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

  if (!user$.value) {
    return <Redirect to="/login" />;
  }

  if (!games) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Home">
      {showPopUp.join ? (
        <PopUp info={showPopUp} updateShowPopUp={updateShowPopUp} />
      ) : null}

      <section className="Home__container">
        <GamesList
          games={games}
          showPopUp={showPopUp}
          updateShowPopUp={updateShowPopUp}
        />
      </section>
    </div>
  );
}

export default Home;
