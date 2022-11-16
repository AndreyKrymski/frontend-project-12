import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/thisContext.js';
import TitleChanel from './TitleChanel';
import Message from './input/Message.jsx';

const Messages = () => {
  const { socket } = useAuth();
  console.log(socket);

  const data = useSelector((state) => state.channels);
  console.log(data);
  const getMessages = (item) => (
    <div className="text-break mb-2" key={item.id}>
      <b>
        {item.username}
        :
        {' '}
      </b>
      <span>{item.body}</span>
    </div>
  );
  return (
    <div className="title">
      <div className="messege-button">
        <TitleChanel />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {data && data.messages.map(getMessages)}
        </div>
        <Message />
      </div>
    </div>
  );
};
export default Messages;
