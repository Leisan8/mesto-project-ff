// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__title').textContent = cardData.name;

    return card;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const createCards = initialCards.map(cardData => createCard(cardData));

createCards.forEach((card) => {
    document.querySelector('.places__list').append(card);
})