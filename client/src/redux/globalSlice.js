import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
    isLogin: false,
    isSearch: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload
    }
  }
})


export default globalSlice;

