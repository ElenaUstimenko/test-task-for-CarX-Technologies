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

  // проверка авторизации - НЕ РАБОТАЕТ
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn) {
      setIsLoggedIn(JSON.parse(storedLoggedIn));
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
      />
    </div>
  );
};

export default App;
