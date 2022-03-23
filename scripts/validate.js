// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationStructure = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  //кнопка отключена
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, object) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    // Если поле не проходит валидацию, покажем ошибку
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, object);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, object);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, submitButtonElement, object) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitButtonElement.classList.add(object.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true)
  } else {
    // иначе сделай кнопку активной
    submitButtonElement.classList.remove(object.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled')
  };
}; 

const setEventListeners = (formElement, object) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const submitButtonElement = formElement.querySelector(object.submitButtonSelector);
  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
  toggleButtonState(inputList, submitButtonElement, object);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', (event) => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, object);
      toggleButtonState(inputList, submitButtonElement, object);
    });
  });
};

const isFormValid = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const submitButtonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, object);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, object)
  });
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, object) => {
  // Выбираем элемент ошибки на основе уникального класса 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(object.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(object.errorClass);
   // Очистим ошибку
  errorElement.textContent = '';
};

// Найдём все формы с указанным классом в DOM
const enableValidation = (object) => {
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(object.formSelector)); 
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (event) => {
    // У каждой формы отменим стандартное поведение
    event.preventDefault();
  });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, object);
}); 
} 
enableValidation(validationStructure);