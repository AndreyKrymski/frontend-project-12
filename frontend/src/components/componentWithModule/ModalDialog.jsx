/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classname';
import { getShowModal } from '../../slices/moduleSlice';

const ModalDialog = ({ children }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.module);
  return (
    <>
      <div onClick={() => dispatch(getShowModal(''))} className={cn('fade', 'show', { 'modal-backdrop': modal.showModal })} />
      <div role="dialog" aria-modal="true" className="fade modal show">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalDialog;
