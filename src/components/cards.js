const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, removeFunction, showImage, toggleLike) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image')
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;
    card.querySelector('.card__delete-button').addEventListener('click', () => removeFunction(card));
    showImage(cardImage, cardData);
    card.querySelector('.card__like-button').addEventListener('click', toggleLike);

    return card;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
    card.remove();
}

export function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

