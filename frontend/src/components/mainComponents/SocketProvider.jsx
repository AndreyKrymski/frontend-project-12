/* eslint-disable functional/no-let */
import React from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  addChannel, addMessage, getActiveChannel, removeChannel, renameChannel,
} from '../../slices/channelsSlice.js';
import { getSocketError } from '../../slices/moduleSlice.js';
import SocketContexts from '../../contexts/SocketContext.js';

const SocketProvider = ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();
  const emitSocket = (type, param) => {
    socket.emit(type, param);
  };

  if (!socket) {
    socket = io();
    socket.on('connect', () => {
      dispatch(getSocketError(false));
    });

    socket.io.on('error', () => {
      dispatch(getSocketError(true));
    });

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      dispatch(getActiveChannel(payload.id));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      dispatch(getActiveChannel(1));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    ws = {
      socket,
      emitSocket,
    };
  }

  return (
    <SocketContexts.Provider value={ws}>
      {children}
    </SocketContexts.Provider>
  );
};
export default SocketProvider;
