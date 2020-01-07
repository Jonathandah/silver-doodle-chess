import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$, updateUser } from '../../global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from '../../global/components/popUp/PopUp';
import './Home.sass';
import Game from "./Game"
import Filters from "./Filters"
// const mockData = require("../../global/mocked/mocked_data");

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
  const [logout, updateLogout] = useState(false);
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
        <Filters games={games} updateGames={updateGames} />

        <ul className="Home__container__list">
          {Object.values(games.data).length > 0
            ? Object.values(games.data).map((game, index) => {
              return (
                <Game game={game} games={games} index={index} showPopUp={showPopUp} updateShowPopUp={updateShowPopUp} key={index} />

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
