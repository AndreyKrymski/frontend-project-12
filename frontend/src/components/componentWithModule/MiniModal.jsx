import React from 'react';
import { useDispatch } from 'react-redux';
import { getShowModal } from '../../slices/moduleSlice';

const MiniModal = ({ getActive }) => {
  const dispatch = useDispatch();
  const change = (name) => (e) => {
    e.preventDefault();
    getActive((modal) => !modal);
    dispatch(getShowModal(name));
  };

  return (
    <div
      aria-labelledby="react-aria2607856649-1"
      className="mini-modal"
      data-popper-reference-hidden="false"
      data-popper-escaped="false"
      data-popper-placement="bottom-start"
    >
      <a onClick={change('removeChannels')} className="dropdown-item" role="button" href="/">Удалить</a>
      <a onClick={change('renameChannels')} className="dropdown-item" role="button" href="/">Переименовать</a>
    </div>
  );
};
export default MiniModal;
