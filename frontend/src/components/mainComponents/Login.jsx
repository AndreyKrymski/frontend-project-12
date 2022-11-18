import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import cn from 'classname';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routers from '../../routes.js';
import '../../style/Login.css';
import local from '../../images/local.jpg';
import useAuth from '../../hooks/thisContext.js';

const Login = () => {
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();
  const inputUsername = useRef();

  useEffect(() => {
    inputUsername.current.focus();
  }, []);
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const responce = await axios.post(routers.login(), values);
        setAuthorization(false);
        localStorage.setItem('userId', JSON.stringify(responce.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        inputUsername.current.select();
        if (err.isAxiosError && err.response.status === 401) {
          setAuthorization(true);
          return;
        }
        throw err;
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
                className={cn('form-contro1', { 'is-invalid': authorization })}
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
                className={cn('form-contro2', { 'is-invalid': authorization })}
                value={formik.values.password}
              />
              {authorization && <p className="err">Неверные имя пользователя или пароль</p>}
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
