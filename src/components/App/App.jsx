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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  // проверка авторизации
  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (savedIsLoggedIn) {
      setIsLoggedIn(savedIsLoggedIn === 'true');
    }
  }, []);

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
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
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
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
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

// ГЛОБАЛЬНЫЕ
// слетает авторизация при перезагрузке страницы - сохраняет в localeStorage, но не достаёт
// не переносится тема и текст из Main в Tickets

// ЛОКАЛЬНЫЕ
// обращение блокируется при нажатии на верную кнопку, но блокируются все, а не выбранное + данные не сохраняются в localeStorage
// не отображаются сохранённые файлы в Tickets