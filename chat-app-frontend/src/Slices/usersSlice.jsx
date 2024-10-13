import { createSlice } from '@reduxjs/toolkit'

const initialState = {
users: [],
userDetail: {},
loading:false,
error:false
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchStart: (state) => {
        state.loading = true;
        state.error = false;
      },
  
      getAllUsers: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state[payload.url] = payload?.data?.data;
      },
  
      fetchFail: (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = payload?.response?.data?.message;
      },
    
  }
});

export const { fetchStart, getAllUsers, fetchFail} = usersSlice.actions

export default usersSlice.reducer