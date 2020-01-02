import React from 'react';
import "./PopUp.sass"
const PopUp = ({ game, updateShowPopUp }) => {
    console.log(game)
    return (
        <div className="PopUp">
            <section className="PopUp__section">
                <div className="PopUp__section__container">
                    <p className="PopUp__section__container__info">
                        Owner: {game.owner}
                    </p>
                    <p className="PopUp__section__container__info">
                        Board: {game.board}
                    </p>
                    <p className="PopUp__section__container__info">
                        White: {game.header.white}
                    </p>
                    <p className="PopUp__section__container__info">
                        Black: {game.header.black}
                    </p>
                </div>

                <nav className="PopUp__section__nav">
                    <button className="PopUp__section__nav__button">Join</button>
                    <button className="PopUp__section__nav__button" onClick={() => updateShowPopUp(false)}>Cancel</button>
                </nav>
            </section>
        </div>
    );
};

export default PopUp;