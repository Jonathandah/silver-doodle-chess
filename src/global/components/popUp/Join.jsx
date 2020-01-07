import React from 'react';

const Join = ({ info }) => {
    return (
        <>
            <p className="PopUp__section__container__info">
                Owner: {info.join.game.owner}
            </p>
            <p className="PopUp__section__container__info">
                Board: {info.join.game.board}
            </p>
            <p className="PopUp__section__container__info">
                White: {info.join.game.header.White}
            </p>
            <p className="PopUp__section__container__info">
                Black: {info.join.game.header.Black}
            </p>
            <p className="PopUp__section__container__info">
                Date: {info.join.game.header.Date}
            </p>
        </>
    );
};

export default Join;