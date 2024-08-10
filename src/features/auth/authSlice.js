import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId") || null,
    managerId: localStorage.getItem("managerId") || null,
    designation: localStorage.getItem("designation") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      const { userId, managerId, designation } = action.payload;
      state.userId = userId;
      state.managerId = managerId;
      state.designation = designation;
      state.status = "succeeded";

      // Persist state in localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("managerId", managerId);
      localStorage.setItem("designation", designation);
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.managerId = null;
      state.designation = null;
      state.status = "idle";
      state.error = null;

      // Clear state from localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("managerId");
      localStorage.removeItem("designation");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
