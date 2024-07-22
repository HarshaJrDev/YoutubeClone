import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videoData: [],
  },
  reducers: {
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
  },
});

export const { setVideoData } = videoSlice.actions;
export default videoSlice.reducer;
