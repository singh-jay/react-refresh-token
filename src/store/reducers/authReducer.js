import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth', // to create action creaters starting by auth/
  initialState: {
    userId: null,
    email: null,
  },
  reducers: {
    //action creater auth/login
    login: (state, action) => {
      let {userId, email} = action.payload;
      state.userId = userId;
      state.email = email;
    },
    //action creater auth/logout
    logout: (state) => {
      state.userId = null;
      state.email = null;
    },
  },
});

// Action creators are generated for each case of the reducer function
export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
