import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import validateUser from '../../Global/functions/validateUser/validateUser';
import ErrorDisplay from '../../Global/components/errorDisplay/ErrorDisplay';
import debounce from '../../Global/functions/debounce/debounce';
import './Register.sass';

function Register() {
  const [formState, { text, password }] = useFormState();
  const [errors, updateErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formState.values);

    if (!Object.keys(validateUser(formState.values)).length) {
      //do axios request
      return <Redirect to="/login" />;
    } else {
      updateErrors(validateUser(formState.values));
    }
  }
  return (
    <div className="Register">
      <section className="Register__section">
        <h2>Register</h2>
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
          {errors.password ? (
            <ErrorDisplay errorMessage={errors.password} />
          ) : null}

          <button type="Submit">Register</button>
        </form>
      </section>
    </div>
  );
}

export default Register;
