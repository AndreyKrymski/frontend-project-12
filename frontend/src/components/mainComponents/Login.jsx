import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import cn from 'classname';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routers from '../../routes.js';
import '../../style/Login.css';
import local from '../../images/local.jpg';
import useAuth from '../../hooks/thisContext.js';

const Login = () => {
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();
  const inputUsername = useRef();
  const { t } = useTranslation();

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
        if (err.code === 'ERR_NETWORK') {
          setAuthorization(false);
          toast(t('errors.errNetwork'), { type: 'error' });
        }
        if (err.isAxiosError && err.response.status === 401) {
          inputUsername.current.select();
          setAuthorization(true);
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
            <h1 className="form-title">{t('login.logIn')}</h1>
            <div className="form-container">
              <input
                onChange={formik.handleChange}
                name="username"
                autoComplete="username"
                required=""
                id="username"
                className={cn('form-control', { 'is-invalid': authorization })}
                value={formik.values.username}
                ref={inputUsername}
              />
              <label className="form-label" htmlFor="username">{t('login.yuorNik')}</label>
            </div>
            <div className="form-container">
              <input
                onChange={formik.handleChange}
                name="password"
                autoComplete="currentPassword"
                required=""
                type="password"
                id="password"
                className={cn('form-control', { 'is-invalid': authorization })}
                value={formik.values.password}
              />
              <label className="form-label" htmlFor="password">{t('login.password')}</label>
              {authorization && <p className="err">{t('errors.errPass')}</p>}
            </div>
            <button type="submit" className="button-primary">{t('login.logIn')}</button>
          </form>
        </div>
      </div>
      <div className="card-footer">
        <div className="text-footer">
          <span>{t('login.acount')}</span>
          <a href="/signup">{t('login.registration')}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
