import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../slices/channelsSlice';
import ContainerChat from '../componentWithChat/ContainerChat';
import Modal from '../componentWithModule/Modal';
import '../../style/Chat.css';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <>
      <ContainerChat />
      <Modal />
    </>
  );
};
export default Chat;
