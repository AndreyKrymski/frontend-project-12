import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classname';
import { getIdMiniModal } from '../../slices/moduleSlice';
import MiniModal from './MiniModal';

const MiniButton = ({ idButton }) => {
  const data = useSelector((state) => state.channels);
  const [active, getActive] = useState(false);
  const dispatch = useDispatch();
  const clickMiniButton = (e) => {
    getActive((modal) => !modal);
    dispatch(getIdMiniModal(e.target.id));
  };

  return (
    <>
      <button
        onClick={clickMiniButton}
        type="button"
        id={idButton}
        aria-expanded="true"
        className={cn('dropdown-toggle-split', { 'btn-str': idButton === data.currentChannelId })}
      >
        1
      </button>
      {active && <MiniModal getActive={getActive} />}
    </>
  );
};
export default MiniButton;
