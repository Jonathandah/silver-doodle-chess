let errors = {};

export default function validateUser(userData) {

  if (userData.username.length >= 4) {
    delete errors.username;
  } else {
    errors = {
      username: 'Username has to be 4 characters or more.',
      ...errors
    };
  }

  if (userData.password.length >= 6) {
    delete errors.password;
  } else {
    errors = {
      password: 'Password has to be 6 characters or more.',
      ...errors
    };
  }

  return errors;
}
