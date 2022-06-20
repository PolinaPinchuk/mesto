import { validationStructure, initialCards } from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css";

const templateSelector = "#element-template";
const cardSelectorDefault = ".elements";

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
    userInfo.setUserInfo(data);
    editProfilePopup.close();
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
    console.log(data);
    const card = createNewCard({
        place: data.place,
        link: data.link,
    });
    section.addItem(card);
    addCardPopup.close();
}

// Создаем карточку на основе данных
const createNewCard = (data) => {
    const card = new Card(data, templateSelector, () => {
        imagePopup.open(data.place, data.link);
    });
    return card.createCard();
};

const formEditProfile = new FormValidator(validationStructure, popupElement);
const cardAddFormValidator = new FormValidator(validationStructure, popupNewCard);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();

export { templateSelector };

const section = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardItem = createNewCard(item);
            section.addItem(cardItem);
        },
    },
    cardSelectorDefault
);
const imagePopup = new PopupWithImage(".popup_type_image");
const addCardPopup = new PopupWithForm(".popup_type_new-card", submitFormCardHandler);
const editProfilePopup = new PopupWithForm(".popup_type_profile", submitFormHandler);

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
section.renderItems();

const userInfo = new UserInfo({ profileNameSelector: ".profile__title", profileJobSelector: ".profile__subtitle" });