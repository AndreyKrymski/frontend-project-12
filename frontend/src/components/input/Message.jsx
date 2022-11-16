import React, { useState } from 'react';
import useAuth from '../../hooks/thisContext';

const Message = () => {
  const [value, setValue] = useState('');
  const { socket } = useAuth();
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('newMessage', value);
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
            placeholder="Введите сообщение..."
            className="form-message-input"
            value={value}
          />
          <button type="submit" disabled="" className="btn-vertical">1</button>
        </div>
      </form>
    </div>
  );
};
export default Message;
