import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

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
        <Input
          type="email"
          id="email"
          label="E-Mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
        />
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
