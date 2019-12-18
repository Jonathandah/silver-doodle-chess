import React, { useState } from 'react';
import axios from 'axios';
import { useFormState } from 'react-use-form-state';
import validateUser from '../../Global/functions/validateUser/validateUser';
import ErrorDisplay from '../../Global/components/errorDisplay/ErrorDisplay';

function Login() {
  const [formState, { text, password }] = useFormState();
  const [errors, updateErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    console.log(validateUser(formState.values));

    if (!Object.keys(validateUser(formState.values)).length) {
      //do axios request
    } else {
      console.log(validateUser(formState.values));
      updateErrors(validateUser(formState.values));
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          {...text({
            name: 'username',
            onChange: e => console.log(e.target.value)
          })}
          required
        />
        {errors.username ? (
          <ErrorDisplay errorMessage={errors.username} />
        ) : null}
        <input {...password('password')} required />
        {errors.password ? (
          <ErrorDisplay errorMessage={errors.password} />
        ) : null}

        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
