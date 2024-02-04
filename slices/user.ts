import {createSlice} from '@reduxjs/toolkit';

//컴포넌트 전체에서 공유하는 전역상태의 변수들 (초기상태)
const initialState = {
  userId: null,
  isLogin: false,
};


const userSlice = createSlice({
  name: 'user',
  initialState,

  //동기액션용 리듀서
  reducers: {
    //모든 상태를 동시에 바꾸는 리듀서
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.isLogin = action.payload.isLogin;
    },

    // userId 바꾸는 리듀서  (주로 데이터 1개일때 편하다)
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },




  },

  //비동기액션용 리듀서
  extraReducers: builder => {},
});

export default userSlice;