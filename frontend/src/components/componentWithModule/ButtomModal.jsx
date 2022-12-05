import React from 'react';
import cn from 'classname';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShowModal } from '../../slices/moduleSlice';

const ButtonModal = ({ props, inputRef }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modal = useSelector((state) => state.module);
  return (
    <form className="">
      <div>
        <div>
          <input
            onChange={props.handleChange}
            value={props.values.channelname}
            ref={inputRef}
            name="channelname"
            id="channelname"
            className={cn('inmput-modal', 'form-control', { 'is-invalid': props.errors.channelname })}
          />
          <label className="form-label" htmlFor="channelname" >{t('modalHeader.nameChannel')}</label>
          {
            props.errors.channelname && <div className="error invalid-feedback">{props.errors.channelname}</div>
          }
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={() => dispatch(getShowModal(''))}
          >
            {t('buttonModal.cancel')}
          </button>
          <button onClick={props.handleSubmit} type="submit" disabled={modal.socketError} className="btn sinii btn-primary">{t('buttonModal.send')}</button>
        </div>
      </div>
    </form>
  );
};
export default ButtonModal;
