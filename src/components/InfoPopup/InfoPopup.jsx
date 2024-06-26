import styles from './InfoPopup.module.scss';

const InfoPopup = props => {
  const { title, isOpen, onClose, onSubmit } = props;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  const handlePopupClose = () => {
    onClose();
    onSubmit();
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      ></div>
      <div
        className={`${styles.infoPopup} ${isOpen ? styles.infoPopupOpened : ''}`}
      >
        <form className={styles.container} onSubmit={handleSubmit}>
          <h2 className={styles.title}>{title}</h2>
          {window.location.pathname.startsWith('/tickets/') &&
          window.location.pathname.split('/').length === 3 ? (
            <>
              <button type='button' onClick={onClose} className={styles.link}>
                вернуться назад
              </button>
              <button
                type='button'
                onClick={handlePopupClose}
                className={styles.btn}
              >
                Закрыть обращение
              </button>
            </>
          ) : (
            <button type='submit' className={styles.btn}>
              ОК
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default InfoPopup;
