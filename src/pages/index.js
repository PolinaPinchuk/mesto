import { validationStructure, initialCards, templateSelector, cardSelectorDefault } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api"

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([user, cards]) => {
        userId = user._id;
        userInfo.setUserInfo(user);
        section.renderItems(cards);
    })
    .catch((err) => console.log(err))

import "./index.css";

// 1 попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup_type_profile");
const popupCloseButtonElement = document.querySelector(".popup__close");
popupOpenButtonElement.addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
});

// Находим форму в DOM
const formElement = popupElement.querySelector('[name="edit-form"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector("#job"); // Воспользуйтесь инструментом .querySelector()

function submitFormHandler(data) {
    editProfilePopup.showLoadingText(true);
    api.editProfile(data)
      .then(res => {
        console.log('res', res)
        userInfo.setUserInfo(res);
        editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
        editProfilePopup.showLoadingText(false)
    })
}

// 2 попап
const popupOpenButtonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtonNewCard = popupNewCard.querySelector(".popup__close");
popupOpenButtonNewCard.addEventListener("click", () => {
    cardAddFormValidator.isFormValid();
    addCardPopup.open();
});

function submitFormCardHandler(data) {
    addCardPopup.showLoadingText(true);
    api.addCard(data.place, data.link)
    .then(res => {
      console.log('res', res)
      const card = createNewCard(res);
      const cardElement = card.createCard()
        section.addItem(cardElement);
        addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
        addCardPopup.showLoadingText(false);
    });
}

// Создаем карточку на основе данных
const createNewCard = (data) => {
    const card = new Card(
        data, 
        templateSelector, 
        () => {imagePopup.open(data.name, data.link)},       
        () => {confirmPopup.open()
               confirmPopup.changeSubmitHandler( () => {
                api.deleteCard(data._id)
                .then (() => {
                    card.deleteCard()
                    confirmPopup.close()
                })
                .catch((err) => console.log(err))
            })
        },
        () => card.setLikes(),        
        api, 
        userId    
    )
    return card
}

const popupAvatar = document.querySelector(".popup_type_avatar");

const formEditProfile = new FormValidator(validationStructure, popupElement);
const cardAddFormValidator = new FormValidator(validationStructure, popupNewCard);
const avatarFormValidator = new FormValidator(validationStructure, popupAvatar);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();
avatarFormValidator.enableValidation();

export { templateSelector };

const section = new Section(
    {
        renderer: (item) => {
            const cardItem = createNewCard(item);
            const cardElement = cardItem.createCard()
            section.addItem(cardElement);
        },
    },
    cardSelectorDefault
);

function submitFormAvatarHandler(data) {
    editAvatarPopup.showLoadingText(true);
    api.editAvatar(data)
      .then(res => {
        userInfo.setUserInfo(res);
        editAvatarPopup.close();
    })
      .catch((err) => console.log(err))
      .finally(() => {
        editAvatarPopup.showLoadingText(false);
    });
}

const imagePopup = new PopupWithImage(".popup_type_image");
const addCardPopup = new PopupWithForm(".popup_type_new-card", submitFormCardHandler);
const editProfilePopup = new PopupWithForm(".popup_type_profile", submitFormHandler);
const editAvatarPopup = new PopupWithForm(".popup_type_avatar", submitFormAvatarHandler);
const confirmPopup = new PopupWithForm(".popup_type_delete-confirm");


imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
confirmPopup.setEventListeners();

const userInfo = new UserInfo({ profileNameSelector: ".profile__title", profileJobSelector: ".profile__subtitle", avatarSelector: ".profile__avatar" });

const popupButtonAvatar = document.querySelector('.profile__avatar-edit');
// открытие попапа редактирование аватара
popupButtonAvatar.addEventListener('click', () => {
    editAvatarPopup.open();
})