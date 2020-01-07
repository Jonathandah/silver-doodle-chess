import React from 'react';
import './PopUp.sass';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import { user$ } from '../../store/userStore';
import moment from 'moment';
import Join from './Join';
import Create from './Create';
const PopUp = ({ info, updateShowPopUp }) => {
  const [formState, { radio, label }] = useFormState();

  function doRequest(e) {
    if (e.target.value === 'Join') {
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
            <Join info={info} />
          ) : (
            <Create label={label} radio={radio} />
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
