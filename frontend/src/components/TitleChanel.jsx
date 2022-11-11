/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';

const TitleChanel = () => {
  const data = useSelector((state) => state.channels);
  const numberOfMessages = data.messages.reduce((acc, item) => {
    if (item.id === data.currentChannelId) {
      acc += 1;
    }
    return acc;
  }, 0);

  const name = data.channels.reduce((acc, item) => {
    if (item.id === data.currentChannelId) {
      acc = item.name;
    }
    return acc;
  }, '');
  return (
    <div className="nameChanels">
      <p className="m-0">
        <b>
          #
          {' '}
          {name}
        </b>
      </p>
      <span className="text-muted">
        {numberOfMessages}
        {' '}
        сообщений
      </span>
    </div>
  );
};
export default TitleChanel;
