import { SET_VIDEO_DATA } from './videoActions';

const initialState = {
  videoData: [],
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_DATA:
      return {
        ...state,
        videoData: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
