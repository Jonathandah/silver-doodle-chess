import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import validateUser from '../../Global/functions/validateUser/validateUser';
import ErrorDisplay from '../../Global/components/errorDisplay/ErrorDisplay';
import debounce from '../../Global/functions/debounce/debounce';
import './Login.sass';

function Login() {
  const [formState, { text, password }] = useFormState();
  const [errors, updateErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    if (!Object.keys(validateUser(formState.values)).length) {
      //do axios request
      return <Redirect to="/" />;
    } else {
      updateErrors(validateUser(formState.values));
    }
  }

  return (
    <div className="Login">
      <section className="Login__section">
        <h2>Login</h2>
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
          {errors.password ? (
            <ErrorDisplay errorMessage={errors.password} />
          ) : null}

          <button type="Submit">Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
