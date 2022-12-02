/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  status: '',
  idMiniModal: '',
  openMiniModal: false,
  socketError: false,
};
const moduleReducer = createSlice({
  name: 'module',
  initialState,
  reducers: {
    getShowModal: (state, action) => {
      state.showModal = !state.showModal;
      state.status = action.payload;
    },
    getIdMiniModal: (state, action) => {
      state.idMiniModal = action.payload;
    },
    openMiniModal: (state) => {
      state.openMiniModal = !state.openMiniModal;
    },
    getSocketError: (state, action) => {
      state.socketError = action.payload;
    },
  },
});
export const {
  getShowModal, getIdMiniModal, openMiniModal, getSocketError,
} = moduleReducer.actions;
export default moduleReducer.reducer;
