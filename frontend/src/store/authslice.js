import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userData: null,
    accessToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action)=>{
            state.isAuthenticated = true;
            state.userData = action.payload.userData;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.userData = null;
            state.accessToken = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
