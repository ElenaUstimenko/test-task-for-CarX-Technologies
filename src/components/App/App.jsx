import { useState } from 'react';
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

  // проверка авторизации
  const initialLoggedIn = !!localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  // info popup
  const closeInfoPopup = () => {
    setInfoPopup(false);
  };

  return (
    <div className={styles.app}>
      <Routes basename='/test-task-for-CarX-Technologies'>
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
                infoPopupText={infoPopupText}
                setInfoPopup={setInfoPopup}
                setInfoPopupText={setInfoPopupText}
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
