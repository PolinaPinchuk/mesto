export class FormValidator {
  constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;

      this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = "";
  }

  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  }

  toggleButtonState() {
      if (this._hasInvalidInput()) {
          this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
          this._submitButtonElement.setAttribute("disabled", true);
      } else {
          this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
          this._submitButtonElement.removeAttribute("disabled");
      }
  }

  isFormValid = () => {
      this.toggleButtonState();
      this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
      });
  };

  _isValid(inputElement) {
      const isInputNotValid = !inputElement.validity.valid;
      if (isInputNotValid) {
          const errorMessage = inputElement.validationMessage;
          this._showInputError(inputElement, errorMessage);
      } else {
          this._hideInputError(inputElement);
      }
  }

  _setEventListeners() {
      this.toggleButtonState();
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              this._isValid(inputElement);
              this.toggleButtonState();
          });
      });
  }
  enableValidation() {
      this._formElement.addEventListener("submit", (event) => {
          event.preventDefault();
      });
      this._setEventListeners();
  }
}