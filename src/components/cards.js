import { deleteCardOnServer, addLikeOnServer, deleteLikeOnServer } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, removeFunction, showImage, toggleLike, likesCount=0) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = card.querySelector('.card__image')
    const cardLikeCounter = card.querySelector('.card__like-counter');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardLikeCounter.textContent = likesCount;

    card.querySelector('.card__title').textContent = cardData.name;

    if (removeFunction === null) {
        card.querySelector('.card__delete-button').remove();
    }
    else {
        card.querySelector('.card__delete-button').addEventListener('click', () => removeFunction(card, cardData._id));
    }
    showImage(cardImage, cardData);
    card.querySelector('.card__like-button').addEventListener('click', (evt) => {
        toggleLike(evt, cardData._id);
    });

    return card;
}

// @todo: Функция удаления карточки

export function removeCard(card, cardId) {
    deleteCardOnServer(cardId);
    card.remove();
}

export function toggleLike(evt, cardId) {
    const likeButton = evt.target;
    const cardLikesContainer = likeButton.closest('.card__likes');
    const likeCounter = cardLikesContainer.querySelector('.card__like-counter');

    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const action = isLiked ? deleteLikeOnServer : addLikeOnServer;

    action(cardId)
        .then(res => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
        })
        .catch(err => {
        console.error('Like action failed:', err);
        });
}

