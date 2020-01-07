import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$, updateUser } from '../../global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from "../../global/components/popUp/PopUp"
import './Home.sass';
import Game from "./Game"
// const mockData = require("../../global/mocked/mocked_data");

function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false })
  const [logout, updateLogout] = useState(false);
  const [error, updateError] = useState('');
  const [games, updateGames] = useState({});

  useEffect(() => {

    axios
      .get('/')
      .then(response => {
        console.log("response is", response)
        updateGames(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
        updateError(error.response.data);
      });

  }, []);




  if (logout) {
    updateUser()
    return <Redirect to="/login" />;
  } else if (!user$.value) {
    // return <Redirect to="/login" />;
  }
  console.log("render")
  return (

    <div className="Home">
      {
        showPopUp.join || showPopUp.create ?
          <PopUp info={showPopUp} updateShowPopUp={updateShowPopUp} />
          :
          null
      }

      <section className="Home__container">
        <nav className="Home__container__nav">
          <button
            className="Home__container__nav__tab"
            onClick={e => console.log(e.target.value)}
          >
            My Games
          </button>
          <button
            className="Home__container__nav__tab"
            onClick={e => console.log(e.target.value)}
          >
            All Games
          </button>
        </nav>
        <ul className="Home__container__list">
          {Object.values(games).map((game, index) => {
            console.log(game)

            return (
              <Game game={game} index={index} showPopUp={showPopUp} updateShowPopUp={updateShowPopUp} />

            );
          })}
        </ul>
      </section>
      <nav className="Home__nav">
        <button className="Home__nav__logout" onClick={() => updateLogout(true)}>
          Logout
      </button>
        <button className="Home__nav__create" onClick={() => updateShowPopUp({ ...showPopUp, create: true })}>Create Game</button>
      </nav>


    </div>
  );
}

export default Home;
