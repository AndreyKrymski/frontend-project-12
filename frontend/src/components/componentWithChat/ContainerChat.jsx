import React from 'react';
import { useDispatch } from 'react-redux';
import { getShowModal } from '../../slices/moduleSlice';
import Channel from './Channel.jsx';
import Messages from './Messages';

const ContainerChat = () => {
  const dispatch = useDispatch();
  return (
    <div className="container-chat">
      <div className="container-title-message">
        <div className="channels">
          <div className="channels-title">
            <span>Каналы</span>
            <button type="submit" className="addChanels" onClick={() => dispatch(getShowModal('newChannels'))}>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channel />
        </div>
        <Messages />
      </div>
    </div>
  );
};
export default ContainerChat;
