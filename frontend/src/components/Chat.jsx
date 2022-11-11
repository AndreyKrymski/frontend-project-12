import React, { useEffect, useState } from 'react';
import cn from 'classname';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, getShowModal } from '../slices/channelsSlice';
import Channel from './Channel.jsx';
import Messages from './Messages';
import '../style/Chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.channels);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const [textModal, getTextModal] = useState('');
  return (
    <>
      <div className="container-chat">
        <div className="container-title-message">
          <div className="channels">
            <div className="channels-title">
              <span>Каналы</span>
              <button type="submit" className="addChanels" onClick={() => dispatch(getShowModal())}>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <Channel />
          </div>
          <Messages />
        </div>
      </div>
      <div className={cn('fadw', 'show', { 'modal-backdrop': data.showModal })} />
      <div role="dialog" aria-modal="true" className="fade modal show">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <form className="">
                <div>
                  <label className="visually-hidden" htmlFor="name">
                    Имя канала
                    <input onChange={(e) => getTextModal(e.target.value)} name="name" id="name" className="mb-2 form-control" value={textModal} />
                  </label>
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary">Отменить</button>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
