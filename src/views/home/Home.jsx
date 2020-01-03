import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$, updateUser } from '../../Global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from '../../Global/components/popUp/PopUp';
import './Home.sass';
const mockData = require('../../Global/mocked/mocked_data');

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
  const [logout, updateLogout] = useState(false);
  const [error, updateError] = useState('');
  const [games, updateGames] = useState({ filter: 'All Games', data: {} });

  useEffect(() => {
    axios
      .get(
        games.filter === 'My Games'
          ? `/api/games/my_games/${user$.value}`
          : '/api/games'
      )
      .then(response => {
        console.log(response.data);
        updateGames({ ...games, data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }, [games.filter]);

  if (logout) {
    updateUser();
    return <Redirect to="/login" />;
  } else if (!user$.value) {
    // return <Redirect to="/login" />;
  }

  return (
    <div className="Home">
      {showPopUp.join || showPopUp.create ? (
        <PopUp
          info={showPopUp}
          updateShowPopUp={updateShowPopUp}
          updateGames={updateGames}
          games={games}
        />
      ) : null}

      <section className="Home__container">
        <nav className="Home__container__nav">
          <button
            className="Home__container__nav__tab"
            onClick={e => updateGames({ ...games, filter: 'My Games' })}
          >
            My Games
          </button>
          <button
            className="Home__container__nav__tab"
            onClick={e => updateGames({ ...games, filter: 'All Games' })}
          >
            All Games
          </button>
        </nav>
        <ul className="Home__container__list">
          {Object.values(games.data).length > 0
            ? Object.values(games.data).map((game, index) => {
                return (
                  <li className="Home__container__list__item" key={index}>
                    <p className="Home__container__list__item__owner">
                      {game.owner}
                    </p>
                    {(!game.header.Black || !game.header.White) &&
                    game.owner !== user$.value ? (
                      <button
                        className="Home__container__list__item__button"
                        onClick={() =>
                          updateShowPopUp({
                            ...showPopUp,
                            join: {
                              game,
                              id: Object.keys(games.data)[index]
                            }
                          })
                        }
                      >
                        Join
                      </button>
                    ) : null}
                  </li>
                );
              })
            : null}
        </ul>
      </section>
      <nav className="Home__nav">
        <button
          className="Home__nav__logout"
          onClick={() => updateLogout(true)}
        >
          Logout
        </button>
        <button
          className="Home__nav__create"
          onClick={() => updateShowPopUp({ ...showPopUp, create: true })}
        >
          Create Game
        </button>
      </nav>
    </div>
  );
}

export default Home;
