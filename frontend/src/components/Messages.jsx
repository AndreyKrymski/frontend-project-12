import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { messages } from '../slices/channelsSlice';
import TitleChanel from './TitleChanel';

const Messages = () => {
  const data = useSelector((state) => state.channels);
  console.log(data);
  const newMessages = data.messages.filter((item) => item.id === data.currentChannelId);
  const [textInput, getTextInput] = useState('');
  const dispatch = useDispatch();
  const setMessages = (e) => {
    e.preventDefault();
    dispatch(messages(textInput));
    getTextInput('');
  };
  const getMessages = (item) => (
    <div className="text-break mb-2" key={item.id * Math.random()}>
      <b>
        {item.name}
        :
        {' '}
      </b>
      <span>{item.messages}</span>
    </div>
  );
  return (
    <div className="title">
      <div className="messege-button">
        <TitleChanel />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {data && newMessages.map(getMessages)}
        </div>
        <div className="input-message">
          <form onSubmit={setMessages} className="form-message">
            <div className="input-group has-validation">
              <input onChange={(e) => getTextInput(e.target.value)} name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="form-message-input" value={textInput} />
              <button type="submit" disabled="" className="btn-vertical">1</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Messages;
