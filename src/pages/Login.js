import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login} from '../store/reducers/authReducer';
import api from '../utils/api';
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
    const {data} = await api.post('/auth/login', {
      email,
      password,
    });
    // console.log(data);
    let userId = data.userId;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    dispatch(login({userId, email}));
    navigate('/');
  };
  // console.log('rendering...');
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
