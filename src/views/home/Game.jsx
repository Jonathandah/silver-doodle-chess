import React from 'react';
import { user$ } from '../../global/store/userStore';

const Game = ({ games, game, showPopUp, updateShowPopUp, index }) => {
    console.log(game)
    return (
        <li className="Home__container__list__item" >
            <p className="Home__container__list__item__owner">
                {game.owner}
            </p>
            {(!game.header.Black || !game.header.White) &&
                (game.header.Black !== user$.value || game.header.White !== user$.value) ? (
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
};

export default Game;