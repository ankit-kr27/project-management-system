import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authslice';
import projectReducer from './projectSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer
    }
})

export default store;