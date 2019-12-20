import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import validateUser from '../../Global/functions/validateUser/validateUser';
import ErrorDisplay from '../../Global/components/errorDisplay/ErrorDisplay';
import debounce from '../../Global/functions/debounce/debounce';
import './Login.sass';
import '../../Global/sass/Theme.sass';

function Login() {
  const [submit, updateSubmit] = useState(false);
  const [formState, { text, password }] = useFormState();
  const [errors, updateErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    if (!Object.keys(validateUser(formState.values)).length) {
      //do axios request

      axios
        .post('/api/login', formState.values)
        .then(response => {
          console.log(response);
          updateSubmit(true);
        })
        .catch(error => {
          console.log(error.response.data);
          updateErrors({ catch: error.response.data });
        });
      // fetch('/api/login', {
      //   method: 'POST',
      //   body: JSON.stringify(formState.values)
      // })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    } else {
      updateErrors(validateUser(formState.values));
    }
  }

  if (submit === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Login">
      <section className="Login__section light__purple">
        <h2 className="white">Login</h2>
        <Link className="Login__section__link--register" to="/register">
          Not yet registered?
        </Link>
        <form onSubmit={handleSubmit} className="Login__section__form">
          <input
            className="Login__section__form__input"
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
            className="Login__section__form__input"
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

          <button type="Submit">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
