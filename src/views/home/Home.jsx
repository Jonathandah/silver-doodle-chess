import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { games$, updateGames } from '../../global/store/games';
import { Redirect } from 'react-router-dom';
import PopUp from '../../global/components/popUp/PopUp';
import GamesList from './GamesList';
import './Home.sass';

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
  const [games, setGames] = useState(null);

  useEffect(() => {
    const sub = games$.subscribe(updates => setGames(updates));

    axios
      .get('/api/games')
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
