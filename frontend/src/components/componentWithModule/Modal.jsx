import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classname';
import * as yup from 'yup';
import { Formik } from 'formik';
import { getShowModal, getIdMiniModal } from '../../slices/moduleSlice.js';
import ModalDialog from './ModalDialog.jsx';
import ModalHeader from './ModalHeader.jsx';
import useAuth from '../../hooks/thisContext.js';
import '../../style/Modal.css';

const Modal = () => {
  const data = useSelector((state) => state.channels);
  const modal = useSelector((state) => state.module);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { socket } = useAuth();
  const name = Object.values(data.channels.map((item) => item.name));
  const nameChanel = data.channels.filter((item) => item.id === Number(modal.idMiniModal))[0];
  const schema = yup.object().shape({
    channelname: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').notOneOf([name], 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  useEffect(() => {
    if (modal.showModal) {
      if (modal.status === 'renameChannels') {
        inputRef.current.select();
      }
      inputRef.current.focus();
    }
  }, [modal.showModal, modal.status]);

  if (modal.status === 'newChannels') {
    return (
      <ModalDialog>
        <ModalHeader props={{ props: 'newChannels' }} />
        <div className="modal-body">
          <Formik
            initialValues={{
              channelname: '',
            }}
            onSubmit={(value) => {
              socket.emit('newChannel', { name: value.channelname });
              dispatch(getShowModal(''));
            }}
            validationSchema={schema}
          >
            {(props) => (
              <form className="">
                <div>
                  <label className="visually-hidden" htmlFor="channelname">
                    <input
                      onChange={props.handleChange}
                      value={props.values.channelname}
                      ref={inputRef}
                      name="channelname"
                      id="channelname"
                      className={cn('inmput-modal', 'form-control', { 'is-invalid': props.errors.channelname })}
                    />
                  </label>
                  {
                    props.errors.channelname && <div className="error invalid-feedback">{props.errors.channelname}</div>
                  }
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={() => dispatch(getShowModal(''))}
                    >
                      Отменить
                    </button>
                    <button onClick={props.handleSubmit} type="submit" className="btn sinii btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </ModalDialog>
    );
  } if (modal.status === 'removeChannels') {
    const deleteChannel = (e) => {
      e.preventDefault();
      socket.emit('removeChannel', { id: Number(modal.idMiniModal) });
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
  } if (modal.status === 'renameChannels') {
    return (
      <ModalDialog>
        <ModalHeader props={{ props: 'renameChannels' }} />
        <div className="modal-body">
          <Formik
            initialValues={{
              channelname: nameChanel.name,
            }}
            onSubmit={(value) => {
              socket.emit('renameChannel', { id: Number(modal.idMiniModal), name: value.channelname });
              dispatch(getIdMiniModal(''));
              dispatch(getShowModal(''));
            }}
            validationSchema={schema}
          >
            {(props) => (
              <form className="">
                <div>
                  <label className="visually-hidden" htmlFor="channelname">
                    <input
                      onChange={props.handleChange}
                      value={props.values.channelname}
                      ref={inputRef}
                      name="channelname"
                      id="channelname"
                      className={cn('inmput-modal', 'form-control', { 'is-invalid': props.errors.channelname })}
                    />
                  </label>
                  {
                    props.errors.channelname && <div className="error invalid-feedback">{props.errors.channelname}</div>
                  }
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={() => dispatch(getShowModal(''))}
                    >
                      Отменить
                    </button>
                    <button onClick={props.handleSubmit} type="submit" className="btn sinii btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </ModalDialog>
    );
  }
  return ('');
};
export default Modal;
