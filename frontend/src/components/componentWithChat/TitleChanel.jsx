/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const TitleChanel = () => {
  const data = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const numberOfMessages = data.messages.reduce((acc, item) => {
    if (item.channelId === data.currentChannelId) {
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
        {t('titleChannel.key', { count: numberOfMessages })}
      </span>
    </div>
  );
};
export default TitleChanel;
