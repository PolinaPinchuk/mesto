import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const cardsContainer = document.querySelector(".elements");

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
const closePopupByClickOnEsc = (event) => {
    if (event.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
};

//Функция, которая закрывает окошко по клику на затемненную область
const closePopupByClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
};

const openPopup = function (popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByClickOnEsc);
};
const closePopup = function (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByClickOnEsc);
};

// 1 попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup_type_profile");
const popupCloseButtonElement = document.querySelector(".popup__close");
popupOpenButtonElement.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupElement);
});
popupCloseButtonElement.addEventListener("click", () => {
    closePopup(popupElement);
});
// Находим форму в DOM
const formElement = popupElement.querySelector('[name="edit-form"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector("#job"); // Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitFormHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupElement);
}

// Создаем карточку на основе данных
function newCard(item) {
    const card = new Card(item, templateSelector);
    return card.createCard();
}
// Вставляем карточку в разметку
function rendCard(item, wrap) {
    const card = newCard(item);
    wrap.prepend(card);
}
// Создаем массив карточек
initialCards.forEach((item) => {
    rendCard(item, cardsContainer);
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", submitFormHandler);

// 2 попап
const popupOpenButtonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtonNewCard = popupNewCard.querySelector(".popup__close");
popupOpenButtonNewCard.addEventListener("click", () => {
    cardAddFormValidator.isFormValid();
    openPopup(popupNewCard);
});
popupCloseButtonNewCard.addEventListener("click", () => {
    closePopup(popupNewCard);
});

const formCard = popupNewCard.querySelector('[name="add-form"]');
const placeInput = formCard.querySelector("#place");
const linkInput = formCard.querySelector("#link");
// Создаем новую карточку
function submitFormCardHandler(evt) {
    evt.preventDefault();
    rendCard(
        {
            place: placeInput.value,
            link: linkInput.value,
        },
        cardsContainer,
        closePopup(popupNewCard),
        formCard.reset(popupNewCard)
    );
}
formCard.addEventListener("submit", submitFormCardHandler);

// 3 попап
const popupPhoto = document.querySelector(".popup_type_image");
const photoImage = document.querySelector(".popup__image");
const photoCaption = document.querySelector(".popup__caption");
const popupCloseButtonImage = popupPhoto.querySelector(".popup__close");
popupCloseButtonImage.addEventListener("click", () => {
    closePopup(popupPhoto);
});

popupElement.addEventListener("click", closePopupByClickOnOverlay);
popupNewCard.addEventListener("click", closePopupByClickOnOverlay);
popupPhoto.addEventListener("click", closePopupByClickOnOverlay);

const formEditProfile = new FormValidator(validationStructure, popupElement);
const cardAddFormValidator = new FormValidator(validationStructure, popupNewCard);

formEditProfile.enableValidation();
cardAddFormValidator.enableValidation();

export { openPopup, templateSelector };