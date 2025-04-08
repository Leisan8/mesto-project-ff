import './pages/index.css'; 
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list')

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, removeFunction, showImage) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image')
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => removeFunction(card));
    showImage(cardImage, cardData);

    return card;
}

function showImage(cardImage, cardData) { 
    cardImage.addEventListener('click', () => {
        const popupImage = document.querySelector('.popup_type_image');
        popupImage.querySelector('.popup__image').src = cardImage.src;
        popupImage.querySelector('.popup__image').alt = cardData.name;
        popupImage.querySelector('.popup__caption').textContent = cardData.name;
        openPopup(popupImage);
    })
}

// @todo: Функция удаления карточки

function removeCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

const cards = initialCards.map(cardData => createCard(cardData, removeCard, showImage));

cards.forEach((card) => {
    cardsList.append(card);
})


function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keypress', handleEsc);
}

function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (!openedPopup) return;
        closePopup(openedPopup);
    }
}


const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    document.forms["edit-profile"].elements.name.value = document.querySelector('.profile__title').textContent;
    document.forms["edit-profile"].elements.description.value = document.querySelector('.profile__description').textContent;
});

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

addButton.addEventListener('click', () => openPopup(popupAdd));

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    });
})

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    })
})

// Находим форму в DOM
const formElement = popupEdit.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);



// Находим форму в DOM
const addImageFormElement = popupAdd.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const placeName = addImageFormElement.querySelector('.popup__input_type_card-name'); 
const link = addImageFormElement.querySelector('.popup__input_type_url'); 


function handleImageCreationSubmit(evt) {
    evt.preventDefault(); 

    const placeNameValue = placeName.value;
    const linkValue = link.value

    const newCardData = {
        name: placeNameValue,
        link: linkValue
    }

    const newCard = createCard(newCardData, removeCard, showImage);

    cardsList.prepend(newCard);

    placeName.value = "";
    link.value = "";

    closePopup(popupAdd);
}

addImageFormElement.addEventListener('submit', handleImageCreationSubmit);