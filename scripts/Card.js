import { openPopup } from "./index.js";

export class Card {
    _popupPhoto = document.querySelector(".popup_type_image");
    _photoImage = document.querySelector(".popup__image");
    _photoCaption = document.querySelector(".popup__caption");

    constructor(item, templateSelector) {
        this._item = item;
        this._templateSelector = templateSelector;
    }

    _likeCard = () => {
        this._cardLike.classList.toggle("element__button_active");
    };

    _getElement() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    }

    createCard = () => {
        this._getElement();
        this._cardTitle = this._cardElement.querySelector(".element__title");
        this._cardImage = this._cardElement.querySelector(".element__image");
        this._cardLike = this._cardElement.querySelector(".element__button");
        this._cardElement.querySelector(".element__delete").addEventListener("click", () => this._removeCard());
        this._cardTitle.textContent = this._item.place;
        this._cardImage.src = this._item.link;
        this._cardImage.alt = this._item.place;
        this._setEventListeners();
        return this._cardElement;
    };

    _removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _openPopupPhoto({ place, link }) {
        this._photoImage.src = link;
        this._photoImage.alt = place;
        this._photoCaption.textContent = place;
        openPopup(this._popupPhoto);
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._likeCard);
        this._cardImage.addEventListener("click", () => this._openPopupPhoto(this._item));
    }
}