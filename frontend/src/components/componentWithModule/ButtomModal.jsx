import React from 'react';
import cn from 'classname';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShowModal } from '../../slices/moduleSlice';

const ButtonModal = ({ props, inputRef }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
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
            {t('buttonModal.cancel')}
          </button>
          <button onClick={props.handleSubmit} type="submit" className="btn sinii btn-primary">{t('buttonModal.send')}</button>
        </div>
      </div>
    </form>
  );
};
export default ButtonModal;
