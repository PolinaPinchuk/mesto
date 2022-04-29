export class FormValidator {
  constructor (templateSelector, formElement) {
    this._templateSelector = templateSelector;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._templateSelector.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._templateSelector.submitButtonSelector);
  }
  
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._templateSelector.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._templateSelector.errorClass);
  }
  
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._templateSelector.inputErrorClass);
    errorElement.classList.remove(this._templateSelector.errorClass);
    errorElement.textContent = '';
  }

   _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  } 
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) { 
      this._submitButtonElement.classList.add(this._templateSelector.inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true)
    } else {
      this._submitButtonElement.classList.remove(this._templateSelector.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled')
    }
  }
  
   _isFormValid = () => {
     this._toggleButtonState();
        this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }
  
  _isValid (inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
    this._hideInputError(inputElement);
    }
  }
  
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(); 
      })
    })
  }
  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.target.reset();
    })
      this._setEventListeners();
  }
}