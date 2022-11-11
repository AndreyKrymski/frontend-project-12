import { useSelector, useDispatch } from 'react-redux';
import cn from 'classname';
import { getActiveChannel } from '../slices/channelsSlice.js';

const Channel = () => {
  const data = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const getChannels = (item) => (
    <li className="nav-item" key={item.id}>
      <button
        type="button"
        className={cn('w-100', 'rounded-0', { 'btn-secondary': item.id === data.currentChannelId })}
        onClick={() => dispatch(getActiveChannel(item.id))}
      >
        #
        {' '}
        {item.name}
      </button>
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
