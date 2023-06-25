import Loader from 'components/Loader/Loader';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserRequest } from 'redux/contacts/userSlice';

import css from './LodinPage.module.css';

function LoginPage() {
  const isLoading = useSelector(state => state.user.isLoading);
  const userData = useSelector(state => state.user.userData);
  const error = useSelector(state => state.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      navigate('/contacts');
    }
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = { email, password };
    dispatch(loginUserRequest(formData));
  };
  return (
    <div>
      <h1 className={css.title}>Log in</h1>
      {isLoading && <Loader />}
      {error && <p>error={error}</p>}
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Email:
          <input
            className={css.input}
            type="email"
            value={email}
            required
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label className={css.label}>
          Password:
          <input
            className={css.input}
            type="password"
            value={password}
            required
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button className={css.button} type="submit" disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
