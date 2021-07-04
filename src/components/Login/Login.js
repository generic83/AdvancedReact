import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailAction = (state, action) => {
  if (action.type === "input") {
    return { value: action.value, isValid: action.value.includes('@') }
  }
  else if (action.type === "blur") {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordAction = (state, action) => {
  if (action.type === "input") {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
  else if (action.type === "blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailAction, {
    value: '',
    isValid: null
  })

  const [passwordState, passwordDispatch] = useReducer(passwordAction, {
    value: '',
    isValid: null
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Checking for validity");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [emailState.isValid, passwordState.isValid]);


  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'input', value: event.target.value });

  };
  const validateEmailHandler = () => {
    emailDispatch({ type: 'blur' });
  };


  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: 'input', value: event.target.value });

  };
  const validatePasswordHandler = () => {
    passwordDispatch({ type: 'blur' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
