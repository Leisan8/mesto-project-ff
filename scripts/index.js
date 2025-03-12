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