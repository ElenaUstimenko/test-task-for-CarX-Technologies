import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoPopup from '../InfoPopup/InfoPopup';
import styles from './Tickets.module.scss';

const Tickets = props => {
  const { 
    setInfoPopup, 
    setInfoPopupText, 
    isEditable
  } = props;
  const { id } = useParams();
  const [textComment, setTextComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [blockedTickets, setBlockedTickets] = useState({});
  const [selectedTicket, setSelectedTicket] = useState({
    category: '',
    text: '',
    files: []
  });

  
  // список комментариев и тикетов
  useEffect(() => {
    
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    const storedTickets = JSON.parse(localStorage.getItem('tickets'));

    if (storedComments) {
      setComments(storedComments);
    }

    if (storedTickets) {
      setTickets(storedTickets);
 
      // НЕ РАБОТАЕТ - тема, текст и файлы не появляются
      const selected = storedTickets.find(ticket => ticket.id === id);
    
    if (selected) {
      setSelectedTicket({
        ...selectedTicket,
        id: selected.id,
        category: selected.category,
        text: selected.text,
        files: selected.files
      });
    }
    }
  }, [id, selectedTicket]);

  // добавление комментария, сохранение в localStorage
  const handleAddComment = e => {
    e.preventDefault();
    if (textComment.trim() !== '') {
      const newComment = {
        text: textComment,
        date: new Date().toLocaleString(),
        ticketId: id
      };

      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      setTextComment('');
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setIsInputEmpty(true);
    }
  };

  const handleInputChange = e => {
    if (e.target.value.length <= 1000) {
      setTextComment(e.target.value);
      setIsInputEmpty(e.target.value.trim() === '');
    }
  };

  // закрытие обращения
  const handleCloseRequest = e => {
    e.preventDefault();
    setInfoPopupText(
      'После закрытия обращения добавление новых комментариев невозможно.'
    );
    setInfoPopup(true);
  };

  // НЕ РАБОТАЕТ - блокируются все обращения, до перезагрузки страницы
  const handleBlockRequest = () => {
    const updatedBlockedTickets = {
      ...blockedTickets,
      [id]: true
    };
    setBlockedTickets(updatedBlockedTickets);
    localStorage.setItem('blockedTickets', JSON.stringify(updatedBlockedTickets));
  };

console.log(tickets)
  return (
    <section className={styles.tickets}>
      <div className={styles.container}>
        <h3 className={styles.title}>Информация об обращении: {id}</h3>

        <div className={styles.mainContainer}>
          <p className={styles.text}>Тема: {selectedTicket.category}</p>
          <p className={styles.text}>Текст: {selectedTicket.text}</p>
        </div>

        {isEditable && !blockedTickets[id] ? (
          <form className={styles.addContainer} noValidate>
            <label className={styles.label}>
              <h6 className={styles.discription}>Добавить комментарий</h6>
              <input
                id='input-text'
                type='text'
                name='text'
                value={textComment}
                onChange={handleInputChange}
                className={styles.input}
                placeholder='Текст до 1 000 символов'
                required
              />
            </label>
            <div className={styles.buttons}>
              <button
                name='button'
                type='submit'
                disabled={isInputEmpty ? true : false}
                onClick={handleAddComment}
                className={styles.btn}
              >
                Добавить комментарий
              </button>
              <button
                name='button'
                type='submit'
                onClick={handleCloseRequest}
                className={styles.btn}
              >
                Закрыть обращение
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.blokDiscription}>
            Обращение закрыто для редактирования
          </p>
        )}
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>Список комментариев</h3>
        <ul className={styles.commentList}>
          {comments
            .filter(comment => comment.ticketId === id)
            .map((comment, index) => (
              <li key={index} className={styles.commentItem}>
                <p>{comment.text}</p> 
                <p className={styles.commentItemDate}>{comment.date}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>Прикреплённые файлы</h3>
        <ul className={styles.fileList}>
        {attachedFiles.map((file, index) => (
      <li key={index} className={styles.fileItem}>
        <p>{file.name}</p>
      </li>
    ))}
        </ul>
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>Список обращений</h3>
        <ul className={styles.ticketsList}>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <Link className={styles.ticketItem} to={`/tickets/${ticket.id}`}>
                <p>Обращение: {ticket.id}</p>
                <p>Тема: {ticket.category}</p>
                <p>Текст: {ticket.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className={styles.link} to='/'>
        <p className={styles.linkText}>вернуться на главную страницу</p>
      </Link>
      <InfoPopup isBlock={isEditable} onSubmit={handleBlockRequest} />
    </section>
  );
};

export default Tickets;
