import React from 'react';
import image from '../images/404.svg';

const NotFound = () => {
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
      <h1 className="h4 text-muted" style={{ fontSize: '50px' }}>Страница не найдена</h1>
      <p className="text-muted" style={{ fontSize: '25px' }}>
        Но вы можете перейти
        <a href="/"> на главную страницу</a>
      </p>
    </div>
  );
};
export default NotFound;
