import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__content");
        this._inputs = this._form.querySelectorAll(".popup__input");
        this._submitButton = this._form.querySelector(".popup__save");
        this._submitButtonText = this._submitButton.textContent
    }

    _getInputValues() {
        this._values = {};
        this._inputs.forEach((input) => {
            this._values[input.name] = input.value;
        });
        return this._values;
    }


    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler

    }

    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault()
            this._handleSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._form.reset();
    }

    showLoadingText(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = `Сохранение...`
        } else {
            this._submitButton.textContent = this._submitButtongText
        }
    }
}