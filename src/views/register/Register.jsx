import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import validateUser from '../../Global/functions/validateUser/validateUser';
import ErrorDisplay from '../../Global/components/errorDisplay/ErrorDisplay';
import debounce from '../../Global/functions/debounce/debounce';
import './Register.sass';
import '../../Global/sass/Theme.sass';

function Register() {
  const [submit, updateSubmit] = useState(false);
  const [formState, { text, password }] = useFormState();
  const [errors, updateErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    if (!Object.keys(validateUser(formState.values)).length) {
      //do axios request
      axios
        .post('/api/register', formState.values)
        .then(response => {
          updateSubmit(true);
        })
        .catch(error => {
          console.error(error.response.data);

        });
    } else {
      updateErrors(validateUser(formState.values));
    }
  }

  if (submit === true) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="Register">
      <section className="Register__section light__purple">
        <h2 className="white">Register</h2>
        <Link className="Register__section__link--login" to="/login">
          Already have an account?
        </Link>
        <form onSubmit={handleSubmit} className="Register__section__form">
          <input
            className="Register__section__form__input"
            placeholder="Username: "
            {...text({
              name: 'username',
              onChange: e => debounce(e.target.value)
            })}
            required
          />
          {errors.username ? (
            <ErrorDisplay errorMessage={errors.username} />
          ) : null}
          <input
            className="Register__section__form__input"
            placeholder="Password: "
            {...password({
              name: 'password',
              onChange: e => debounce(e.target.value)
            })}
            required
          />
          {errors.password || errors.catch ? (
            <ErrorDisplay errorMessage={errors.password || errors.catch} />
          ) : null}

          <button type="Submit">Register</button>
        </form>
      </section>
    </div>
  );
}

export default Register;
