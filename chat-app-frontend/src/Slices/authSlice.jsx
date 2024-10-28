import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
      id:"",
      username: "",
      email: "",
      image: "",
      isAdmin: "",
      friends:[] 
    },
    loading: false,
    error: false,
    errorMessage: "",
    token: ""
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      fetchStart: (state) => {
        state.loading = true;
        state.error = false;
      },
  
      registerSuccess: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.user = {
          ...state.user,
          id: payload.data._id,
          username: payload.data.username,
          image: payload.data.image,
          email: payload.data.email,
          isAdmin: payload.data.isAdmin,
         
  
        };
  
        state.token = payload.token;
      },
  
      loginSuccess: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.user = {
          ...state.user,
          id: payload?.user?._id,
          username: payload?.user?.username,
          email: payload?.user?.email,
          image: payload?.user?.image,
          isAdmin: payload.user?.isAdmin,
          friends: payload.user?.friends
        };
  
        state.token = payload?.token;
      },
  
      logoutSuccess: (state) => {
        state.error = false;
        state.loading = false;
        state.user = {};
        state.token = "";
      },
  
      getUserInfo:(state,{payload})=> {
        state.loading = false;
        state.error = false;
        state.user = {
          ...state.user,
          id: payload?._id,
          username: payload?.username,
          email: payload?.email,
          image: payload?.image,
          isAdmin: payload?.isAdmin,
        };
      },

      updateUserInfo:(state,{payload})=> {
        state.loading = false;
        state.error = false;
        state.user = {
          ...state.user,
          id: payload?._id,
          username: payload?.username,
          email: payload?.email,
          image: payload?.image,
          isAdmin: payload?.isAdmin,
        };
      },
  
      fetchFail: (state, {payload}) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = payload?.response?.data?.message
      },
      clearError: (state) => {
        state.error = false;
      },
    },
  });
  
  export const {
    fetchStart,
    fetchFail,
    loginSuccess,
    logoutSuccess,
    registerSuccess,
    getUserInfo,
    updateUserInfo,
    clearError 
  } = authSlice.actions;

export default authSlice.reducer