import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 currentUser : null,
 loading : null,
 error : false
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
          signInStart : (state)=>{
            state.loading = true;
          },
          signInSuccess : (state,action)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=action.payload;
          },
          signIinFailure :(state,action)=>{
            state.loading = false;
            state.error = action.payload;
          },
    },
});

export const {signInStart , signInSuccess , signIinFailure} = userSlice.actions;

export default userSlice.reducer;