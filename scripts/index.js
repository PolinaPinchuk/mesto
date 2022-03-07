const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = document.querySelector(".popup__close");

const openPopup = function () {
    popupElement.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};
popupOpenButtonElement.addEventListener("click", openPopup);

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};
popupCloseButtonElement.addEventListener("click", closePopup);

// Находим форму в DOM
let formElement = popupElement.querySelector(".popup__content"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector("#name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector("#job"); // Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
