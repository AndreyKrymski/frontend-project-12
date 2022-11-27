import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShowModal } from '../../slices/moduleSlice';

const ModalHeader = ({ props }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const text = {
    newChannels: t('modalHeader.newChannels'),
    removeChannels: t('modalHeader.removeChannels'),
    renameChannels: t('modalHeader.renameChannels'),
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
