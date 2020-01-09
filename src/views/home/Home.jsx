import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from '../../global/components/popUp/PopUp';
import GamesList from './GamesList';
import './Home.sass';

import call from '../../global/api/endpoints';

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
  const [games, updateGames] = useState(null);

  useEffect(() => {
    axios
      .get(call.ALL_GAMES())
      .then(response => {
        updateGames(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
        <ul className="Home__container__list">
          {Object.values(games).length > 0
            ? Object.values(games).map((game, index) => {
                return (
                  <GamesList
                    game={game}
                    games={games}
                    index={index}
                    showPopUp={showPopUp}
                    updateShowPopUp={updateShowPopUp}
                    key={index}
                  />
                );
              })
            : null}
        </ul>
      </section>
    </div>
  );
}

export default Home;
