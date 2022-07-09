export class Card {
    constructor(data, templateSelector, handleImageClick, handleDeleteClick, handleLikeClick, api, userId) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = data.userId;
        this._ownerId = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._api = api
        this._userId = userId
    }

    _likeCard = () => {
        this._cardLike.classList.add("element__button_active");
    };
    
    _getElement() {
        this._card = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    }

    setLikes() {
        if (!(this._cardLike.classList.contains("element__button_active"))) {
            this._fillLike()
        } else {
            this._emptyLike()
        }
    }
    
    _fillLike() {
        this._api.addLike(this._id)
          .then(() => {
            this._cardLike.classList.add("element__button_active");
            this._likeCountElement.textContent = this._likes.length;
        })
        .catch((err) => {console.log(err)})
    }

    _emptyLike () {
        this._api.deleteLike(this._id)
        .then(() => {
            this._cardLike.classList.remove("element__button_active");
            this._likeCountElement.textContent = this._likes.length;
        })
        .catch((err) => {console.log(err)})
    }

    createCard = () => {
        this._getElement();
        this._cardTitle = this._card.querySelector(".element__title");
        this._cardImage = this._card.querySelector(".element__image");
        this._cardLike = this._card.querySelector(".element__button");
        this._elementDelete = this._card.querySelector(".element__delete");

        this._likeCountElement = this._card.querySelector('.element__button-count');
        this._likeCountElement.textContent = this._likes.length

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
  
        if (this._ownerId !== this._userId) {
            this._elementDelete.style.display = 'none'
        }
       
        if (this._likes.some((obj) => this._userId === obj._id)) {
            this._likeCard()
        }

        return this._card;
    };

    deleteCard() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._cardLike.addEventListener("click", this._handleLikeClick);
        this._cardImage.addEventListener("click", this._handleImageClick);
        this._elementDelete.addEventListener("click", this._handleDeleteClick);
    }
}