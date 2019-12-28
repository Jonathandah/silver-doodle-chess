import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { updateUser } from '../../global/store/userStore';
import { useFormState } from 'react-use-form-state';
import axios from 'axios';
import validateUser from '../../global/functions/validateUser/validateUser';
import ErrorDisplay from "../../global/components/errorDisplay/ErrorDisplay"
import debounce from '../../global/functions/debounce/debounce';
import './Login.sass';
import '../../global/sass/Theme.sass';

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
          console.log(Object.values(response.data)[0].username);
          updateUser(Object.values(response.data)[0].username);
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
