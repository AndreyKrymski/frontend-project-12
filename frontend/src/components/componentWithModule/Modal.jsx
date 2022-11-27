import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { getShowModal, getIdMiniModal } from '../../slices/moduleSlice.js';
import ModalDialog from './ModalDialog.jsx';
import ModalHeader from './ModalHeader.jsx';
import ButtonModal from './ButtomModal.jsx';
import useAuth from '../../hooks/thisContext.js';
import '../../style/Modal.css';

const Modal = () => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.channels);
  const modal = useSelector((state) => state.module);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { socket } = useAuth();
  const name = Object.values(data.channels.map((item) => item.name));
  const nameChanel = data.channels.filter((item) => item.id === Number(modal.idMiniModal))[0];
  const schema = yup.object().shape({
    channelname: yup.string().min(3, t('signUp.otTreefor')).max(20, t('signUp.otTreefor')).notOneOf([name], t('modal'))
      .required(t('signUp.reguire')),
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
              <ButtonModal props={props} inputRef={inputRef} />
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
              <div className="text-delete" ref={inputRef}>{t('question')}</div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={() => dispatch(getShowModal(''))}
                >
                  {t('buttonModal.cancel')}
                </button>
                <button type="submit" className="btn red btn-primary">{t('miniModal.delete')}</button>
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
              <ButtonModal props={props} inputRef={inputRef} />
            )}
          </Formik>
        </div>
      </ModalDialog>
    );
  }
  return ('');
};
export default Modal;
