import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    managerId: null,
    travelAgentId: null, // Add travelAgentId to the initial state
    token: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.userId = action.payload.userId;
      state.managerId = action.payload.managerId;
      state.travelAgentId = action.payload.travelAgentId; // Set travelAgentId on login
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.managerId = null;
      state.travelAgentId = null; // Clear travelAgentId on logout
      state.token = null;
      state.status = 'idle';
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
