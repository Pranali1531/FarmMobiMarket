import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  isNewUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { access, refresh, user, isNewUser } = action.payload;

      state.isAuthenticated = true;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.user = user;
      state.isNewUser = isNewUser;

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isNewUser = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
