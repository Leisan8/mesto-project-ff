// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, removeFunction) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__title').textContent = cardData.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => removeFunction(card));

    return card;
}

// @todo: Функция удаления карточки

function removeCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

const createCards = initialCards.map(cardData => createCard(cardData, removeCard));

createCards.forEach((card) => {
    document.querySelector('.places__list').append(card);
})