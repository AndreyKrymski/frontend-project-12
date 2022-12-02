import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import cn from 'classname';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import routes from '../../routes';
import useAuth from '../../hooks/thisContext.js';
import '../../style/SingUp.css';
import imageSignUp from '../../images/signUp.jpg';

const SingUp = () => {
  const [authorization, setAuthorization] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const schema = yup.object().shape({
    username: yup.string().min(3, t('signUp.otTreefor')).max(20, t('signUp.otTreefor')).required(t('signUp.reguire')),
    password: yup.string().min(6, t('signUp.notSixSimvols')).required(t('signUp.reguire')),
    confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUp.passwordRegure')).required(t('signUp.reguire')),
  });
  const inputUsername = useRef();
  useEffect(() => {
    inputUsername.current.focus();
  });

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-body-center">
          <div className="image-container">
            <img src={imageSignUp} alt="изображение пользователя" className="local-image" />
          </div>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validateOnBlur
            onSubmit={async (values) => {
              const { username, password } = values;
              try {
                const responce = await axios.post(routes.createNewuser(), { username, password });
                setAuthorization(false);
                localStorage.setItem('userId', JSON.stringify(responce.data));
                auth.logIn();
                navigate('/');
              } catch (err) {
                inputUsername.current.select();
                if (err.isAxiosError && err.response.status === 409) {
                  setAuthorization(true);
                  return;
                }
                throw err;
              }
            }}
            validationSchema={schema}
          >
            {(props) => (
              <form className="form">
                <h1 className="form-title">{t('login.registration')}</h1>
                <div className="form-container">
                  <input
                    name="username"
                    id="username"
                    autoComplete="username"
                    required=""
                    className={cn('form-control', { 'is-invalid': (props.touched.username && props.errors.username) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    ref={inputUsername}
                  />
                  <label className="form-label" htmlFor="username">{t('signUp.nameUser')}</label>
                  {
                    props.touched.username && props.errors.username && <p className="errors1">{props.errors.username}</p>
                  }
                </div>
                <div className="form-container">
                  <input
                    name="password"
                    autoComplete="password"
                    type="password"
                    id="password"
                    required=""
                    className={cn('form-control', { 'is-invalid': (props.touched.password && props.errors.password) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                  <label className="form-label" htmlFor="password">{t('login.password')}</label>
                  {
                    props.touched.password && props.errors.password && <p className="errors2">{props.errors.password}</p>
                  }
                </div>
                <div className="form-container">
                  <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    id="confirmPassword"
                    className={cn('form-control', { 'is-invalid': (props.touched.confirmPassword && props.errors.confirmPassword) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                  />
                  <label className="form-label" htmlFor="confirmPassword">{t('signUp.passwordPass')}</label>
                  {
                    props.touched.confirmPassword
                    && props.errors.confirmPassword
                    && <p className="errors3">{props.errors.confirmPassword}</p>
                  }
                </div>
                {
                  authorization && <div className="error-singUp">{t('signUp.thisUserComplete')}</div>
                }
                <button
                  disabled={!props.isValid || !props.dirty}
                  onClick={props.handleSubmit}
                  type="submit"
                  className="button-primary"
                >
                  {t('signUp.registration')}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
