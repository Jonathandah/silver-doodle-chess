import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user$, updateUser } from '../../global/store/userStore';
import { Redirect } from 'react-router-dom';
import PopUp from "../../global/components/popUp/PopUp"
import './Home.sass';

let testData = {

  1: {
    header: { black: null, white: "Yaro" },
    board: "1",
    owner: "Yaro"
  },

  2: {
    header: { black: "Emma", white: "Yaro" },
    board: "2",
    owner: "Emma"
  },

  3: {
    header: { black: "Joanna", white: null },
    board: "3",
    owner: "Joanna"
  },

  4: {
    header: { black: "Jonathan", white: "Joanna" },
    board: "4",
    owner: "Jonathan"
  },

}


function Home() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false })
  const [logout, updateLogout] = useState(false);
  const [error, updateError] = useState('');
  const [games, updateGames] = useState(testData);

  useEffect(() => {




    // axios
    //   .get('')
    //   .then(response => {
    //     console.log(response.data);
    //     updateGames(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //     updateError(error.response.data);
    //   });

  }, []);




  if (logout) {
    updateUser()
    return <Redirect to="/login" />;
  }


  return (

    <div className="Home">
      {
        showPopUp.join ?
          <PopUp game={showPopUp.join} updateShowPopUp={updateShowPopUp} />
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
            return (
              <li className="Home__container__list__item" key={index} >
                <p className="Home__container__list__item__owner" >{game.owner}</p>
                {
                  !game.header.black || !game.header.white ?
                    <button className="Home__container__list__item__button" onClick={() => updateShowPopUp({ ...showPopUp, join: game })} >Join</button> : null
                }
              </li>
            );
          })}
        </ul>
      </section>
      <nav className="Home__nav">
        <button className="Home__nav__logout" onClick={() => updateLogout(true)}>
          Logout
      </button>
        <button className="Home__nav__create">Create Game</button>
      </nav>


    </div>
  );
}

export default Home;
