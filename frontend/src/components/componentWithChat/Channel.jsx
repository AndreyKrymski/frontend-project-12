import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classname';
import { getActiveChannel } from '../../slices/channelsSlice.js';
import MiniButton from '../componentWithModule/MiniButton.jsx';

const Channel = () => {
  const data = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const getChannels = (item) => (
    <li className="nav-item" key={item.id}>
      <button
        type="button"
        className={cn('w-100', 'button-chanels', 'rounded-0', { 'btn-secondary': item.id === data.currentChannelId })}
        onClick={() => dispatch(getActiveChannel(item.id))}
      >
        #
        {' '}
        {item.name}
      </button>
      {item.removable && <MiniButton idButton={item.id} />}
    </li>
  );

  return (
    data
    && (
      <div className="chennels-item">
        <ul className="chennels-ul">
          {data.channels.map(getChannels)}
        </ul>
      </div>
    )
  );
};
export default Channel;
