import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classname';
import { getShowModal, getIdMiniModal } from '../../slices/moduleSlice.js';
import ModalDialog from './ModalDialog.jsx';
import ModalHeader from './ModalHeader.jsx';
import useAuth from '../../hooks/thisContext.js';
import '../../style/Modal.css';

const Modal = () => {
  const [textModal, getTextModal] = useState('');
  const [invalid, getInvalid] = useState(false);
  const data = useSelector((state) => state.channels);
  const modal = useSelector((state) => state.module);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { socket } = useAuth();

  useEffect(() => {
    if (modal.showModal) {
      if (modal.status === 'renameChannels') {
        const nam = data.channels.filter((item) => item.id === Number(modal.idMiniModal))[0];
        getTextModal(nam.name);
        inputRef.current.select();
      } else {
        getTextModal('');
      }
      getInvalid(false);
      inputRef.current.focus();
    }
  }, [data.channels, modal.idMiniModal, modal.showModal, modal.status]);

  if (modal.status === 'newChannels' && modal.showModal) {
    const getForm = (e) => {
      e.preventDefault();
      const useName = data.channels.map((item) => item.name === textModal).includes(true);
      if (useName) {
        getInvalid(true);
      } else {
        getInvalid(false);
        socket.emit('newChannel', { name: textModal });
        getTextModal('');
        dispatch(getShowModal(''));
      }
    };
    return (
      <ModalDialog>
        <ModalHeader props={{ props: 'newChannels' }} />
        <div className="modal-body">
          <form className="" onSubmit={getForm}>
            <div>
              <label className="visually-hidden" htmlFor="name">
                <input
                  onChange={(e) => getTextModal(e.target.value)}
                  ref={inputRef}
                  name="name"
                  id="name"
                  className={cn('inmput-modal', 'form-control', { 'is-invalid': invalid })}
                  value={textModal}
                />
              </label>
              <div className={cn('error', { 'invalid-feedback': invalid })}>Должно быть уникальным</div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => dispatch(getShowModal(''))}
                >
                  Отменить
                </button>
                <button type="submit" className="btn sinii btn-primary">Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </ModalDialog>
    );
  } if (modal.status === 'removeChannels' && modal.showModal) {
    const deleteChannel = (e) => {
      e.preventDefault();
      socket.emit('removeChannel', { id: Number(modal.idMiniModal) });
      getTextModal('');
      dispatch(getShowModal(''));
      dispatch(getIdMiniModal(''));
    };
    return (
      <ModalDialog>
        <ModalHeader props={{ props: 'removeChannels' }} />
        <div className="modal-body">
          <form className="" onSubmit={deleteChannel}>
            <div>
              <div className="text-delete" ref={inputRef}>Уверены?</div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => dispatch(getShowModal(''))}
                >
                  Отменить
                </button>
                <button type="submit" className="btn red btn-primary">Удалить</button>
              </div>
            </div>
          </form>
        </div>
      </ModalDialog>
    );
  } if (modal.status === 'renameChannels' && modal.showModal) {
    const renameChannel = (e) => {
      e.preventDefault();
      const useName = data.channels.map((item) => item.name === textModal).includes(true);
      if (useName) {
        getInvalid(true);
      } else {
        getInvalid(false);
        socket.emit('renameChannel', { id: Number(modal.idMiniModal), name: textModal });
        getTextModal('');
        dispatch(getShowModal(''));
        dispatch(getIdMiniModal(''));
      }
    };
    return (
      <ModalDialog>
        <ModalHeader props={{ props: 'renameChannels' }} />
        <div className="modal-body">
          <form className="" onSubmit={renameChannel}>
            <div>
              <label className="visually-hidden" htmlFor="name">
                <input
                  onChange={(e) => getTextModal(e.target.value)}
                  ref={inputRef}
                  name="name"
                  id="name"
                  className={cn('inmput-modal', 'form-control', { 'is-invalid': invalid })}
                  value={textModal}
                />
              </label>
              <div className={cn('error', { 'invalid-feedback': invalid })}>Должно быть уникальным</div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => dispatch(getShowModal(''))}
                >
                  Отменить
                </button>
                <button type="submit" className="btn sinii btn-primary">Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </ModalDialog>
    );
  }
  return ('');
};
export default Modal;
