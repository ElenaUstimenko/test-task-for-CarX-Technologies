import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Tickets from '../Tickets/Tickets';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';
import styles from './App.module.scss';

const App = () => {
  const [infoPopup, setInfoPopup] = useState(false);
  const [infoPopupText, setInfoPopupText] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  // проверка авторизации
  const initialLoggedIn = !!localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  // info popup
  const closeInfoPopup = () => {
    setInfoPopup(false);
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? (
              <Main
                setInfoPopup={setInfoPopup}
                setInfoPopupText={setInfoPopupText}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/tickets/:id'
          element={
            isLoggedIn ? (
              <Tickets
                setInfoPopup={setInfoPopup}
                setInfoPopupText={setInfoPopupText}
                setIsEditable={setIsEditable}
                isEditable={isEditable}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/login'
          element={
            <Login
              setInfoPopup={setInfoPopup}
              setInfoPopupText={setInfoPopupText}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <InfoPopup
        title={infoPopupText}
        isOpen={infoPopup}
        onClose={closeInfoPopup}
        onSubmit={closeInfoPopup}
        setIsEditable={setIsEditable}
      />
    </div>
  );
};

export default App;

// ОШИБКИ
// не переносится тема и текст из Main в Tickets
// не отображаются сохранённые загруженные файлы в Tickets в спец.блоке
// обращение блокируется при нажатии на верную кнопку, но блокируются все, а не выбранное + данные не сохраняются в localeStorage
