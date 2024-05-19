import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/constants';
import styles from './Main.module.scss';

const Main = props => {
  const { setInfoPopup, setInfoPopupText } = props;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tickets, setTickets] = useState([]);

  // выбор темы обращения
  const handleCategoryChange = e => {
    const value = e.target.value;
    if (value === 'Другое') {
      setSelectedCategory('Другое');
      setShowCustomInput(true);
    } else {
      setSelectedCategory(value);
      setShowCustomInput(false);
    }
  };

  const handleCustomCategoryChange = e => {
    setCustomCategory(e.target.value);
  };

  // ограничение длины текста в обращении
  const handleInputChange = e => {
    if (e.target.value.length <= 1000) {
      setText(e.target.value);
    }
  };

  // прикрепление файлов
  const handleFileChange = e => {
    const newFile = e.target.files[0];

    if (selectedFiles.length < 5 && newFile) {
      setSelectedFiles([...selectedFiles, newFile]);
    } else {
      setInfoPopup(true);
      setInfoPopupText('Вы можете прикрепить не более 5 файлов.');
    }
  };

  // список обращений
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets'));
    if (storedTickets) {
      setTickets(storedTickets);
    }
  }, []);

  // добавление обращения
  const handleSubmit = e => {
    e.preventDefault();

    const fileData = selectedFiles.map(file => ({
      name: file.name,
      data: URL.createObjectURL(file)
    }));

    const newTicket = {
      id: tickets.length + 1,
      category:
        selectedCategory === 'Другое' ? customCategory : selectedCategory,
      text: text,
      files: fileData
    };

    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    setSelectedCategory('');
    setCustomCategory('');
    setShowCustomInput(false);
    setText('');
    setSelectedFiles([]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h3 className={styles.title}>Создать новое обращение</h3>
        <form
          action='#'
          name='form-login'
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={styles.category}>
            <label className={styles.label}>
              <h6 className={styles.discription}>Тема обращения</h6>
              <select
                id='input-category'
                className={styles.input}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value='' disabled hidden>
                  Выберите тему обращения
                </option>
                {categories.map(category => (
                  <option
                    className={styles.option}
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>
            {showCustomInput && (
              <label className={styles.label}>
                <input
                  type='text'
                  value={customCategory}
                  onChange={handleCustomCategoryChange}
                  className={styles.input}
                  placeholder='Введите тему вручную'
                  required
                />
              </label>
            )}
          </div>
          <label className={styles.label}>
            <h6 className={styles.discription}>Текст обращения</h6>
            <input
              id='input-text'
              type='text'
              name='text'
              value={text}
              onChange={handleInputChange}
              className={styles.input}
              placeholder='Текст до 1 000 символов'
              required
            />
          </label>
          <label className={styles.label}>
            <h6 className={styles.discription}>Прикрепить файлы (до 5 штук)</h6>
            <input
              className={styles.files}
              type='file'
              onChange={handleFileChange}
            />
            {selectedFiles.map((file, index) => (
              <div className={styles.file} key={index}>
                {file.name}
              </div>
            ))}
          </label>
          <button
            name='button'
            type='submit'
            disabled={
              selectedCategory === 'Другое'
                ? text === '' || customCategory === ''
                : text === '' || selectedCategory === ''
            }
            className={styles.btn}
          >
            Отправить
          </button>
        </form>
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
    </main>
  );
};

export default Main;
