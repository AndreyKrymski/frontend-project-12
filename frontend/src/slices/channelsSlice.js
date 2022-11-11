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
  showModal: false,
};
const channelsReducer = createSlice({
  name: 'responce',
  initialState,
  reducers: {
    getActiveChannel: (state, active) => {
      state.currentChannelId = active.payload;
    },
    messages: (state, active) => {
      state.messages.push({ id: state.currentChannelId, messages: active.payload, name: 'Anrey' });
    },
    getShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    addStatus: (state) => {
      state.messages.push({ id: 10 * Math.random(), name: 'Andrey', messages: 'Привет всем' });
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
  addStatus, getShowModal, getActiveChannel, messages,
} = channelsReducer.actions;
export default channelsReducer.reducer;