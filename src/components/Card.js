export class Card {
    constructor(data, templateSelector, handleImageClick) {
        this._link = data.link;
        this._name = data.place;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
    }

    _likeCard = () => {
        this._cardLike.classList.toggle("element__button_active");
    };

    _getElement() {
        this._card = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    }

    createCard = () => {
        this._getElement();
        this._cardTitle = this._card.querySelector(".element__title");
        this._cardImage = this._card.querySelector(".element__image");
        this._cardLike = this._card.querySelector(".element__button");
        this._card.querySelector(".element__delete").addEventListener("click", () => this._removeCard());
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._card;
    };

    _removeCard() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._likeCard);
        this._cardImage.addEventListener("click", () => this._handleImageClick());
    }
}