import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
    .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload.user;

    localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;