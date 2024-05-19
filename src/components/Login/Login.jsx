import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation.jsx';
import eyeOpen from '../../images/icons/eye-open.png';
import eyeClose from '../../images/icons/eye-close.png';
import styles from './Login.module.scss';

const Login = props => {
  const { 
    isLoggedIn, 
    setIsLoggedIn, 
    setInfoPopup, 
    setInfoPopupText 
  } = props;
  const { errors, isValid, handleChange, resetForm, formValue } =
    useValidation();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleInputChange = e => {
    handleChange(e);
  };

  // видимость / невидимость пароля
  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
    setPasswordType(prevType =>
      prevType === 'password' ? 'text' : 'password'
    );
  };

  // учётные данные для доступа к приватным страницам зашиты в код
  const hardcodedCredentials = {
    login: 'admin',
    password: 'admin'
  };

  // сохранение данных в localStorage
  const handleSubmit = e => {
    e.preventDefault();

    const enteredLogin = e.target.elements.login.value;
    const enteredPassword = e.target.elements.password.value;

    if (
      enteredLogin === hardcodedCredentials.login &&
      enteredPassword === hardcodedCredentials.password
    ) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', isLoggedIn);
      localStorage.setItem('userLogin', formValue.login);
      localStorage.setItem('userPassword', formValue.password);

      navigate('/');
      setLogin('');
      setPassword('');
    } else {
      setInfoPopup(true);
      setInfoPopupText('Что-то пошло не так! Попробуйте ещё раз.');
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <h3 className={styles.title}>Вход в личный кабинет</h3>
        <form
          action='#'
          name='form-login'
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <label className={styles.label}>
            <h6 className={styles.discription}>Логин</h6>
            <input
              id='input-login'
              type='text'
              name='login'
              className={styles.input}
              placeholder='Логин'
              required
              autoComplete='off'
              pattern='.{5,}'
              title='Логин должен состоять из не менее чем 5 символов.'
              value={formValue.login || ''}
              onChange={handleInputChange}
            />
            <span
              className={`${!isValid && errors.login ? styles.inputError : ''}`}
              id='login-error'
            >
              {errors.login || ''}
            </span>
          </label>
          <label className={styles.label}>
            <h6 className={styles.discription}>Пароль</h6>
            <input
              id='input-password'
              name='password'
              className={styles.input}
              placeholder='Пароль'
              type={passwordVisible ? 'text' : 'password'}
              required
              pattern='.{5,}'
              title='Пароль должен состоять из не менее чем 5 символов.'
              value={formValue.password || ''}
              onChange={handleInputChange}
            />
            <button
              type='button'
              className={styles.passwordVisibilityBtn}
              onClick={togglePasswordVisibility}
            >
              <img
                className={styles.img}
                src={passwordVisible ? eyeOpen : eyeClose}
                alt={passwordVisible ? 'eyeOpen' : 'eyeClose'}
              />
            </button>
            <span
              className={`${
                !isValid && errors.password ? styles.inputError : ''
              }`}
              id='password-error'
            >
              {errors.password || ''}
            </span>
          </label>
          <button
            name='button'
            type='submit'
            disabled={!isValid}
            className={styles.btn}
          >
            Войти
          </button>
          <div className={styles.register}>
            <p className={styles.text}>Ещё не зарегистрированы?</p>
            <Link className={styles.signupLink} to={'/signup'}>
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
