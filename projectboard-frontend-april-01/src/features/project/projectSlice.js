import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async () => {
    const res = await API.get("/projects");
    return res.data;
  }
);

export const createProject = createAsyncThunk(
  "project/create",
  async (data) => {
    const res = await API.post("/projects", data);
    return res.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
  },
});

export default projectSlice.reducer;