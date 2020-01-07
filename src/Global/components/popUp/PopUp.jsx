import React from 'react';
import './PopUp.sass';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import { user$ } from '../../store/userStore';
import moment from 'moment';
const PopUp = ({ info, updateShowPopUp }) => {
    const [formState, { radio, label }] = useFormState();

    function doRequest(e) {
        if (e.target.value == 'Join') {
            axios
                .post(`/api/games/${info.join.id}/join`, { username: user$.value })
                .then(response => {
                    console.log(response);
                    updateShowPopUp({ join: false, create: false });
                });
        } else {
            let newGame = {
                header: {
                    Black: null,
                    White: null,
                    Date: moment().format('YYYY-MM-DD')
                },
                board: 'test',
                owner: user$.value
            };

            newGame.header[formState.values.color] = user$.value;

            axios.post('/api/games', newGame).then(response => {
                console.log(response);
                updateShowPopUp({ join: false, create: false });
            });
        }
    }

    return (
        <div className="PopUp">
            <section className="PopUp__section">
                <div className="PopUp__section__container">
                    {info.join ? (
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
                    ) : (
                            <form>
                                <label {...label('color', 'white')}>White</label>
                                <input {...radio('color', 'White')} />

                                <label {...label('color', 'Black')}>Black</label>
                                <input {...radio('color', 'Black')} />
                            </form>
                        )}
                </div>

                <nav className="PopUp__section__nav">
                    <button
                        className="PopUp__section__nav__button"
                        value={info.join ? 'Join' : 'Create Game'}
                        onClick={e => doRequest(e)}
                    >
                        {info.join ? 'Join' : 'Create Game'}
                    </button>
                    <button
                        className="PopUp__section__nav__button"
                        onClick={() => updateShowPopUp({ join: false, create: false })}
                    >
                        Cancel
          </button>
                </nav>
            </section>
        </div>
    );
};

export default PopUp;
