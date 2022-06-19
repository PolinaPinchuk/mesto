import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
// index.js
import './index.css';

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationStructure = {
    formSelector: ".popup__content",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    //кнопка отключена
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

const templateSelector = "#element-template";
const cardSelectorDefault = '.elements';

const initialCards = [
    {
        place: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        place: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        place: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        place: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        place: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        place: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

//Функция, которая закрывает окошко по клику на Esc
//const closePopupByClickOnEsc = (event) => {
//    if (event.key === "Escape") {
//        closePopup(document.querySelector(".popup_opened"));
//    }
//};

//Функция, которая закрывает окошко по клику на затемненную область
//const closePopupByClickOnOverlay = (event) => {
//    if (event.target === event.currentTarget) {
//        closePopup(event.target);
 //   }
//};

//const openPopup = function (popup) {
//    popup.classList.add("popup_opened");
//    document.addEventListener("keydown", closePopupByClickOnEsc);
//};
//const closePopup = function (popup) {
//    popup.classList.remove("popup_opened");
//    document.removeEventListener("keydown", closePopupByClickOnEsc);
//};

// 1 попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup_type_profile");
const popupCloseButtonElement = document.querySelector(".popup__close");
popupOpenButtonElement.addEventListener("click", () => {
  const {name, job} = userInfo.getUserInfo()
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
});
popupCloseButtonElement.addEventListener("click", () => {
    closePopup(popupElement);
});
// Находим форму в DOM
const formElement = popupElement.querySelector('[name="edit-form"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector("#job"); // Воспользуйтесь инструментом .querySelector()
//const profileName = document.querySelector(".profile__title");
//const profileJob = document.querySelector(".profile__subtitle");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function submitFormHandler(data) {
//  console.log('data', data)
//  const {name, job} = data
  userInfo.setUserInfo(data);
//    profileName.textContent = name;
//    profileJob.textContent = job;
//function submitFormHandler(evt) {
//    evt.preventDefault(); 
//    profileName.textContent = nameInput.value;
//    profileJob.textContent = jobInput.value;
    editProfilePopup.close();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//formElement.addEventListener("submit", submitFormHandler);

// 2 попап
const popupOpenButtonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtonNewCard = popupNewCard.querySelector(".popup__close");
popupOpenButtonNewCard.addEventListener("click", () => {
    cardAddFormValidator.isFormValid();
    addCardPopup.open();
});
popupCloseButtonNewCard.addEventListener("click", () => {
   closePopup(popupNewCard);
});

//const formCard = popupNewCard.querySelector('[name="add-form"]');
//const placeInput = formCard.querySelector("#place");
//const linkInput = formCard.querySelector("#link");
// Создаем новую карточку
//function submitFormCardHandler(evt) {
//   evt.preventDefault();

function submitFormCardHandler(data) {
console.log(data)
  const card = newCard ({
    place: data.place,
    link: data.link
//    place: placeInput.value,
//    link: linkInput.value,
  })  
section.addItem(card) 
  addCardPopup.close()
  }

// Создаем карточку на основе данных
const newCard = (data) => {
    const card = new Card(data, templateSelector, () => {
      imagePopup.open(data.place, data.link)
    });
    return card.createCard();
}
// Вставляем карточку в разметку
//const rendCard = (data, wrap) => {
//    const card = newCard(data);  
//    wrap.prepend(card);
//}

//formCard.addEventListener("submit", submitFormCardHandler);
//popupElement.addEventListener("click", closePopupByClickOnOverlay);
//popupNewCard.addEventListener("click", closePopupByClickOnOverlay);

const formEditProfile = new FormValidator(validationStructure, popupElement);
const cardAddFormValidator = new FormValidator(validationStructure, popupNewCard);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();

export { templateSelector };

//const section = new Section ({items: initialCards, renderer: rendCard}, '.elements')
const section = new Section ({items: initialCards, renderer: (item) => {
    const cardItem = newCard(item);
    section.addItem(cardItem)
  }}, cardSelectorDefault)
const imagePopup = new PopupWithImage ('.popup_type_image')
const addCardPopup = new PopupWithForm ('.popup_type_new-card', submitFormCardHandler)
const editProfilePopup = new PopupWithForm ('.popup_type_profile', submitFormHandler)

imagePopup.setEventListeners()
editProfilePopup.setEventListeners()
addCardPopup.setEventListeners()
section.renderItems()

const userInfo = new UserInfo ({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'})