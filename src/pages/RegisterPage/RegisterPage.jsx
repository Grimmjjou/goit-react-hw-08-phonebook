import React from 'react';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequest } from 'redux/contacts/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import css from './RegisterPage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.user.isLoading);
  const error = useSelector(state => state.user.error);
  const userData = useSelector(state => state.user.userData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const formData = { name, email, password };
    dispatch(registerUserRequest(formData));
    setName('');
    setEmail('');
    setPassword('');
  };
  useEffect(() => {
    if (userData !== null) {
      navigate('/contacts');
    }
  }, [userData, navigate]);

  return (
    <div>
      <h1 className={css.title}>Registration</h1>
      {isLoading && <Loader />}
      {error && <p>error={error}</p>}
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name:
          <input
            className={css.input}
            type="text"
            value={name}
            required
            onChange={event => setName(event.target.value)}
          />
        </label>
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
        <button className={css.button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
