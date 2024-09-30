import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  loading: false,
  error: false,
  errorMessage: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getRooms: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.rooms = payload?.data?.data;
    },

    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload?.response?.data?.message;
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const { fetchStart, fetchFail, getRooms, clearError } =
  roomSlice.actions;

export default roomSlice.reducer;
