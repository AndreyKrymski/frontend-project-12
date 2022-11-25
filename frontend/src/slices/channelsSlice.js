/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const { data } = await axios.get(routes.getData(), { headers: getAuthHeader() });
    return data;
  },
);
const initialState = {
  channels: [],
  currentChannelId: '',
  messages: [],
};
const channelsReducer = createSlice({
  name: 'responce',
  initialState,
  reducers: {
    getActiveChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((item) => item.id !== action.payload.id);
      state.messages = state.messages.filter((item) => item.channelId !== action.payload.id);
    },
    renameChannel: (state, action) => {
      state.channels = state.channels
        .map((item) => (item.id === action.payload.id ? action.payload : item));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;
        state.messages = action.payload.messages;
      });
  },
});
export const {
  addMessage, getActiveChannel, addChannel, removeChannel, renameChannel,
} = channelsReducer.actions;
export default channelsReducer.reducer;
