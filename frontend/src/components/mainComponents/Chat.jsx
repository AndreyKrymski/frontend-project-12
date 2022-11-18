import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks, addMessage } from '../../slices/channelsSlice';
import ContainerChat from '../componentWithChat/ContainerChat';
import Modal from '../componentWithModule/Modal';
import useAuth from '../../hooks/thisContext';
import '../../style/Chat.css';

const Chat = () => {
  const { socket } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }, [dispatch, socket]);
  return (
    <>
      <ContainerChat />
      <Modal />
    </>
  );
};
export default Chat;
