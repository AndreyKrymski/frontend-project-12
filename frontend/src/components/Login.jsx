import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import cn from 'classname';
import * as yup from 'yup';
import '../style/Login.css';
import local from '../images/local.jpg';

const Login = () => {
  const inputUsername = useRef();
  useEffect(() => {
    inputUsername.current.focus();
  });

  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.mixed().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const validValues = await schema.validate(values);
        console.log(validValues);
      } catch (e) {
        console.log(e);
        setIsValidName(true);
        setIsValidPassword(true);
      }
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-body-center">
          <div className="image-container">
            <img src={local} alt="изображение пользователя" className="local-image" />
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <h1 className="form-titl">Войти</h1>
            <div className="form-container-usernam">
              <input
                onChange={formik.handleChange}
                name="username"
                autoComplete="username"
                required=""
                placeholder="Ваш ник"
                id="username"
                className={cn('form-contro1', { 'input-control1': isValidName })}
                value={formik.values.username}
                ref={inputUsername}
              />
            </div>
            <div className="form-container-password">
              <input
                onChange={formik.handleChange}
                name="password"
                autoComplete="currentPassword"
                required=""
                placeholder="Пароль"
                type="password"
                id="password"
                className={cn('form-contro2', { 'input-control2': isValidPassword })}
                value={formik.values.password}
              />
            </div>
            <button type="submit" className="button-primary">Войти</button>
          </form>
        </div>
      </div>
      <div className="card-footer">
        <div className="text-footer">
          <span>Нет аккаунта? </span>
          <a href="/signup">Регистрация</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
