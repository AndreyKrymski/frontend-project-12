import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import cn from 'classname';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import routes from '../../routes';
import useAuth from '../../hooks/thisContext.js';
import '../../style/SingUp.css';
import imageSignUp from '../../images/signUp.jpg';

const SingUp = () => {
  const [authorization, setAuthorization] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const schema = yup.object().shape({
    username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
    password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
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
                <h1 className="form-title">Регистрация</h1>
                <div className="form-container-username">
                  <input
                    name="username"
                    placeholder="Имя пользователя"
                    id="username"
                    className={cn('form-control1', { 'is-invalid': (props.touched.username && props.errors.username) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    ref={inputUsername}
                  />
                  {
                  props.touched.username && props.errors.username && <p className="errors1">{props.errors.username}</p>
                  }
                </div>
                <div className="form-container-password">
                  <input
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={cn('form-control2', { 'is-invalid': (props.touched.password && props.errors.password) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                  {
                  props.touched.password && props.errors.password && <p className="errors2">{props.errors.password}</p>
                  }
                </div>
                <div className="form-container-password-confirmation">
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                    id="confirmPassword"
                    className={cn('form-control3', { 'is-invalid': (props.touched.confirmPassword && props.errors.confirmPassword) || authorization })}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                  />
                  {
                  props.touched.confirmPassword
                  && props.errors.confirmPassword
                  && <p className="errors3">{props.errors.confirmPassword}</p>
                  }
                </div>
                {
                  authorization && <div className="error-singUp">Такой пользователь уже существует</div>
                }
                <button
                  disabled={!props.isValid || !props.dirty}
                  onClick={props.handleSubmit}
                  type="submit"
                  className="button-primary"
                >
                  Зарегистрироваться
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
