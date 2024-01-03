import { createSlice, current } from "@reduxjs/toolkit";

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
          updateUserStart : (state) =>{
            state.loading = true;
          },
          updateUserSuccess : (state,action)=>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
          },
          updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
          }
    },
});

export const {signInStart ,
             signInSuccess , 
             signIinFailure , 
             updateUserStart ,
             updateUserSuccess,
             updateUserFailure } = userSlice.actions;

export default userSlice.reducer;