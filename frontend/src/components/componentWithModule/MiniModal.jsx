import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShowModal } from '../../slices/moduleSlice';

const MiniModal = ({ getActive }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      <div className="href-button">
        <a onClick={change('removeChannels')} className="dropdown-item" role="button" href="/">{t('miniModal.delete')}</a>
        <a onClick={change('renameChannels')} className="dropdown-item" role="button" href="/">{t('miniModal.rename')}</a>
      </div>
    </div>
  );
};
export default MiniModal;
