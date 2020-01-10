import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$ } from '../../global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from '../../global/components/popUp/PopUp';
import GamesList from './GamesList';
import './Home.sass';

import call from '../../global/api/endpoints';

let test = {

  1: {
    header: { Black: null, White: "Yaro", Date: "2019-01-02" },
    board: "1",
    owner: "Yaro"
  },

  2: {
    header: { Black: "Emma", White: "Yaro", Date: "2019-01-02" },
    board: "2",
    owner: "Emma"
  },

  3: {
    header: { Black: "Joanna", White: null, Date: "2019-01-02" },
    board: "3",
    owner: "Joanna"
  },

  4: {
    header: { Black: "Jonathan", White: "Joanna", Date: "2019-01-02" },
    board: "4",
    owner: "Jonathan"
  },

}

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });
  const [games, updateGames] = useState(test);

  useEffect(() => {
    axios
      .get(call.ALL_GAMES())
      .then(response => {
        updateGames(test);
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
                  updateGames={updateGames}
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
