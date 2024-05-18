import { useState, useCallback } from 'react';

export function useValidation() {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [formValue, setFormValue] = useState({
    login: '',
    password: ''
  });

  const handleChange = e => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setFormValue({
      ...formValue,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: input.validationMessage
    });

    if (name === 'login') {
      if (
        e.target.validationMessage === 'Введите данные в указанном формате.'
      ) {
        setErrors({
          ...errors,
          login: 'Логин должен состоять из не менее чем 5 символов.'
        });
      }
    }

    if (name === 'password') {
      if (
        e.target.validationMessage === 'Введите данные в указанном формате.'
      ) {
        setErrors({
          ...errors,
          password: 'Пароль должен состоять из не менее чем 5 символов.'
        });
      }
    }
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValue = {}, newErrorMessage = {}, newIsValid = false) => {
      setFormValue(newValue);
      setErrors(newErrorMessage);
      setIsValid(newIsValid);
    },
    [setFormValue, setErrors, setIsValid]
  );

  return {
    formValue,
    handleChange,
    resetForm,
    errors,
    isValid,
    setFormValue
  };
}

export default useValidation;
