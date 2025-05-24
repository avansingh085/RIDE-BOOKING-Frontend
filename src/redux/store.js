import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './bike/bikeSlice';
 import authReducer from './auth/authSlice'; 
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    bike: bikeReducer,
    auth: authReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // useful for some async payloads
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
