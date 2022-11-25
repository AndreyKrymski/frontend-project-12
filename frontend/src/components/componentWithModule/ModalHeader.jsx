import React from 'react';
import { useDispatch } from 'react-redux';
import { getShowModal } from '../../slices/moduleSlice';

const ModalHeader = ({ props }) => {
  const dispatch = useDispatch();
  const text = {
    newChannels: 'Добавить канал',
    removeChannels: 'Удалить канал',
    renameChannels: 'Переименовать канал',
  };
  return (
    <div className="modal-header">
      <div className="modal-title h4">{text[props.props]}</div>
      <button
        type="button"
        aria-label="Close"
        data-bs-dismiss="modal"
        className="btn btn-close"
        onClick={() => dispatch(getShowModal(''))}
      />
    </div>
  );
};
export default ModalHeader;
