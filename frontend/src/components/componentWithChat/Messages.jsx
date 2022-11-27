import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TitleChanel from './TitleChanel';
import MessageInput from './MessageInput.jsx';

const Messages = () => {
  const data = useSelector((state) => state.channels);
  const messagChannelsId = data.messages.filter((item) => item.channelId === data.currentChannelId);
  const inputRef = useRef();
  useEffect(() => {
    if (messagChannelsId.length !== 0) {
      inputRef.current.scrollIntoView();
    }
  }, [messagChannelsId]);
  const getMessages = (item, index) => (
    <div className="text-break mb-2" key={item.id}>
      <b>
        {item.username}
        :
        {' '}
      </b>
      {(messagChannelsId.length - 1 === index)
        ? (<span ref={inputRef}>{item.body}</span>)
        : (<span>{item.body}</span>)}
    </div>
  );
  return (
    <div className="title">
      <div className="messege-button">
        <TitleChanel />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagChannelsId.map(getMessages)}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
export default Messages;
