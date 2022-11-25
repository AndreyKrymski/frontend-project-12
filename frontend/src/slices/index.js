import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import moduleReducer from './moduleSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    module: moduleReducer,
  },
});
