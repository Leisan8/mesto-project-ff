import './pages/index.css'; 
import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list')

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, removeFunction) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image')
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => removeFunction(card));

    return card;
}

// @todo: Функция удаления карточки

function removeCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

const cards = initialCards.map(cardData => createCard(cardData, removeCard));

cards.forEach((card) => {
    cardsList.append(card);
})


function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
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

editButton.addEventListener('click', () => openPopup(popupEdit));

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

