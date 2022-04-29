import { openPopup } from './index.js';

export class Card {
	_popupPhoto = document.querySelector(".popup_type_image");
	_photoImage = document.querySelector(".popup__image");
    _photoCaption = document.querySelector(".popup__caption");
	_templateSelector = document.querySelector("#element-template").content;
	constructor(item) {
		this._item = item;
	}

	_likeCard = () => {
		this._cardLike.classList.toggle('element__button_active');
	}

	createCard = () => {
		this._cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
		this._cardTitle = this._cardElement.querySelector(".element__title");
		this._cardImage = this._cardElement.querySelector(".element__image");
		this._cardLike = this._cardElement.querySelector('.element__button');
		this._cardElement.querySelector('.element__delete').addEventListener('click', () => this._removeCard());
		this._cardTitle.textContent = this._item.place;
		this._cardImage.src = this._item.link;
		this._cardImage.alt = this._item.place;
		this._setEventListeners();
		return this._cardElement;
	}

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
		this._cardLike.addEventListener('click', this._likeCard);
		this._cardImage.addEventListener('click', () => this._openPopupPhoto(this._item));
	}

}