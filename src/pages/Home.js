import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/reducers/authReducer';
import api from '../utils/api';
export default function Home() {
  let navigate = useNavigate();
  // let location = useLocation();
  // console.log(location);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  useEffect(() => {
    // console.log('useEffect');
  }, []);
  const loginHandler = () => {
    navigate('/login');
  };
  const getCurrentUser = async () => {
    try {
      const {data} = await api.get('/get-current-user');
      console.log('user data', data);
    } catch (error) {
      console.warn('user data error', error);
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div
        style={{
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <h2>Refresh Token Test</h2>
        <div style={{display: 'flex', gap: '20px'}}>
          <Link to="/about">About Us</Link>
          {email ? (
            <>
              <span>Hello {email}</span>
              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <button onClick={loginHandler}>Login</button>
          )}
        </div>
      </div>
      <div>
        {email && <button onClick={getCurrentUser}>Get Logged In User</button>}
      </div>
    </div>
  );
}
