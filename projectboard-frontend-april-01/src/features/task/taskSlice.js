import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

/* ================================
   🔹 FETCH TASKS
================================ */
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/tasks/${projectId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

/* ================================
   🔹 CREATE TASK
================================ */
export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await API.post("/tasks", taskData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

/* ================================
   🔹 UPDATE TASK
================================ */
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/tasks/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

/* ================================
   🔹 SLICE
================================ */
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ========================
         FETCH TASKS
      ======================== */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========================
         CREATE TASK
      ======================== */
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // instant UI update
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========================
         UPDATE TASK
      ======================== */
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;