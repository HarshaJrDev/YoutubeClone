import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice'; // Adjust path as needed

const store = configureStore({
  reducer: {
    videos: videoReducer,
  },
});

export default store;
