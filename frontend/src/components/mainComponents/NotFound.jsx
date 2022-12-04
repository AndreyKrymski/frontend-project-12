import React from 'react';
import { useTranslation } from 'react-i18next';
import image from '../../images/404.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="conteiner-body">
      <img
        className="imageNotFound"
        alt="не найдено изображение"
        src={image}
      />
      <h1 className="titleNotFound">{t('notFound.listNot')}</h1>
      <p className="textNotFound">
        {t('notFound.navigList')}
        <a href="/">{t('notFound.mainList')}</a>
      </p>
    </div>
  );
};
export default NotFound;
