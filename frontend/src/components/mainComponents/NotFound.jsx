import React from 'react';
import { useTranslation } from 'react-i18next';
import image from '../../images/404.svg';

const NotFound = () => {
  const { t } = useTranslation();
  const styleImage = {
    height: '500px',
    verticalAlign: 'center',
    boxSizing: 'border-box',
    textAlign: 'center',
  };
  return (
    <div className="text-center" style={{ textAlign: 'center', height: '1500px' }}>
      <img
        style={styleImage}
        className="image"
        alt="не найдено изображение"
        src={image}
      />
      <h1 className="h4 text-muted" style={{ fontSize: '50px' }}>{t('notFound.listNot')}</h1>
      <p className="text-muted" style={{ fontSize: '25px' }}>
        {t('notFound.navigList')}
        <a href="/">{t('notFound.mainList')}</a>
      </p>
    </div>
  );
};
export default NotFound;
