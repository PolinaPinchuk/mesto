const openPopup = function (popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupByClickOnEsc);
};
const closePopup = function (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupByClickOnEsc);
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
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", submitFormHandler);

// 2 попап
const popupOpenButtonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtonNewCard = popupNewCard.querySelector(".popup__close");
popupOpenButtonNewCard.addEventListener("click", () => {
    openPopup(popupNewCard);
});
popupCloseButtonNewCard.addEventListener("click", () => {
    closePopup(popupNewCard);
});

const formCard = popupNewCard.querySelector('[name="add-form"]'); 
const placeInput = formCard.querySelector("#place"); 
const linkInput = formCard.querySelector("#link"); 
function submitFormCardHandler(evt) {
    evt.preventDefault(); 
    const renderCard = {
      place: placeInput.value,
      link: linkInput.value
    };
//   Создаем карточку на основе данных
const cardElement = createCard(renderCard.place, renderCard.link);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
    closePopup(popupNewCard);
    event.currentTarget.reset();
}
formCard.addEventListener("submit", submitFormCardHandler);


const initialCards = [
    {
      place: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      place: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      place: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      place: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      place: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      place: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

//Напишите отдельную функцию создания карточки на основе шаблона template:
const createCard = (elementplace, elementlink) => {
// Клонируем шаблон, наплоняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardTitle = cardElement.querySelector(".element__title");
  const cardImage = cardElement.querySelector(".element__image");
  cardTitle.textContent = elementplace;
  cardImage.src = elementlink;
  cardImage.alt = elementplace;
  setCardEventListeners(cardElement);
  // Возвращаем получившуюся карточку
  return cardElement;
}

//Еще у вас должны быть отдельные функции-обработчики:
//Обработка клика на лайк, который переключает модификатор на сердечке
function likeCard(evt) {
    evt.target.classList.toggle("element__button_active");
}

//Обработка клика на мусорку для удаления карточки (внутри что-то типа evt.target.closest('.card').remove();)
function removeCard(evt) {
    evt.target.closest(".element").remove();
}

const cardsContainer = document.querySelector(".elements");

// 3 попап
const popupPhoto = document.querySelector(".popup_type_image");
const photoImage = document.querySelector(".popup__image");
const photoCaption = document.querySelector(".popup__caption");
const popupCloseButtonImage = popupPhoto.querySelector(".popup__close");
popupCloseButtonImage.addEventListener("click", () => {
    closePopup(popupPhoto);
});

//Ну и, конечно же, нужно еще добавить начальные карточки в верстку:
initialCards.forEach(function(card) {
  cardElement = createCard(card.place, card.link);
  cardsContainer.append(cardElement);
});

function setCardEventListeners(itemElement) {
  itemElement.querySelector('.element__delete').addEventListener('click', removeCard);
  itemElement.querySelector('.element__button').addEventListener('click', likeCard);
  itemElement.querySelector('.element__image').addEventListener('click', () => {
    openPopupPhoto(itemElement);
  });
}
function openPopupPhoto(itemElement) {
  const itemImage = itemElement.querySelector('.element__image');
  photoImage.src = itemImage.src;
  photoImage.alt = itemImage.alt;
  photoCaption.textContent = itemElement.querySelector('.element__title').textContent;
  openPopup(popupPhoto);
}

//Функция, которая закрывает окошко по клику на затемненную область
 const closePopupByClickOnOverlay = (event) =>{
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupNewCard.addEventListener('click', closePopupByClickOnOverlay);
popupPhoto.addEventListener('click', closePopupByClickOnOverlay);
//Функция, которая закрывает окошко по клику на Esc
const closePopupByClickOnEsc = (event) =>{
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};