import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Home.sass';
function Home() {
  const [error, updateError] = useState('');
  const [games, updateGames] = useState([
    'jontahn',
    'chrille',
    'john',
    'Oscar',
    'Tobbe',
    'Maurits'
  ]);

  // useEffect(()=>{
  //   axios.get("").then((response)=>{
  //     console.log(response.data)
  //     updateGames(response.data)
  //   }).catch(error=>{
  //     console.log(error.response.data)
  //     updateError(error.response.data)
  //   })
  // },[])

  return (
    <div className="Home">
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
          {games.map((game, index) => {
            return (
              <li className="Home__container__list__item" key={index}>
                {game}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Home;
