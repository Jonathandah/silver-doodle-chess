import React from 'react';

const Game = ({ game, showPopUp, updateShowPopUp, index }) => {
    console.log(game)
    return (
        <li className="Home__container__list__item" key={index} >
            <p className="Home__container__list__item__owner" >{game.owner}</p>
            {
                !game.header.Black || !game.header.White ?
                    <button className="Home__container__list__item__button" onClick={() => updateShowPopUp({ ...showPopUp, join: game })} >Join</button> : null
            }
        </li>
    );
};

export default Game;