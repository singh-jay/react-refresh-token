import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
export default configureStore({
  reducer: {
    auth: authReducer, // get auth reducer store via state.auth key
  },
});
