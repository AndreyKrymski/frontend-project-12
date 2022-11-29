import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/thisContext';

const MessageInput = () => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.channels);
  const [value, setValue] = useState('');
  const { socket, filteredStr } = useAuth();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  const submitForm = (e) => {
    e.preventDefault();
    const filterText = filteredStr(value);
    socket.emit(
      'newMessage',
      {
        body: filterText,
        channelId: data.currentChannelId,
        username: (JSON.parse(localStorage.userId)).username,
      },
    );
    setValue('');
  };
  return (
    <div className="input-message">
      <form onSubmit={submitForm} className="form-message">
        <div className="input-group has-validation">
          <input
            onChange={(e) => setValue(e.target.value)}
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('messageInput')}
            className="form-message-input"
            value={value}
            ref={inputRef}
          />
          <button type="submit" disabled="" className="btn-vertical">1</button>
        </div>
      </form>
    </div>
  );
};
export default MessageInput;
