/* eslint-disable functional/no-let */
import React from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  addChannel, addMessage, getActiveChannel, removeChannel, renameChannel,
} from '../../slices/channelsSlice.js';
import { getSocketError } from '../../slices/moduleSlice.js';
import SocketContexts from '../../contexts/SocketContext.js';

const typeSuccess = { type: 'success', autoClose: 2500 };
const SocketProvider = ({ children }) => {
  const { t } = useTranslation();
  let socket;
  let ws;
  const dispatch = useDispatch();
  const emitSocket = (type, param) => {
    socket.emit(type, param, (status) => {
      if (status && type !== 'newMessage') {
        toast(t(`toastify.${type}`), typeSuccess);
      }
    });
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
