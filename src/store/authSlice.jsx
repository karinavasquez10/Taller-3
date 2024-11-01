import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  users: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    register: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;