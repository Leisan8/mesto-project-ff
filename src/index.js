import './pages/index.css'; 

import { createCard, removeCard, toggleLike} from './components/cards.js';
import { openPopup, closePopup } from './components/modals.js';

import { clearValidation, enableValidation} from './components/validation.js';

import { fetchUserData, fetchCards, addNewCardOnServer, updateProfileDetialsOnServer} from './components/api.js';

// @todo: Темплейт карточки
const cardsList = document.querySelector('.places__list')
const popupImage = document.querySelector('.popup_type_image');
const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

// Находим форму в DOM
const formEditProfile = popupEdit.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditProfile.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

// Находим форму в DOM
const addImageFormElement = popupAdd.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const inputNameFormProfile = addImageFormElement.querySelector('.popup__input_type_card-name'); 
const inputLinkFormAddNewCard = addImageFormElement.querySelector('.popup__input_type_url'); 

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');



export function showImage(cardImage, cardData) { 
    cardImage.addEventListener('click', () => {
        popupImage.querySelector('.popup__image').src = cardImage.src;
        popupImage.querySelector('.popup__image').alt = cardData.name;
        popupImage.querySelector('.popup__caption').textContent = cardData.name;
        openPopup(popupImage);
    })
}


editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    editProfileForm.elements.name.value = profileTitle.textContent;
    editProfileForm.elements.description.value = profileDescription.textContent;
});


addButton.addEventListener('click', () => openPopup(popupAdd));


closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt) => {
        const openedPopup = evt.target.closest('.popup');
        closePopup(openedPopup);
        
        const openedForm = openedPopup.querySelector('.popup__form');
        clearValidation(openedForm, enableValidationConfig);
    });
})


popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);

            const openedPopup = evt.target.closest('.popup');
            const openedForm = openedPopup.querySelector('.popup__form');
            clearValidation(openedForm, enableValidationConfig);
        }
    })
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job;

    updateProfileDetialsOnServer(name, job);

    closePopup(popupEdit);
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);


function handleImageCreationSubmit(evt) {
    evt.preventDefault(); 

    const placeNameValue = inputNameFormProfile.value;
    const linkValue = inputLinkFormAddNewCard.value

    const newCardData = {
        name: placeNameValue,
        link: linkValue
    }

    const newCard = createCard(newCardData, removeCard, showImage, toggleLike);
    addNewCardOnServer(placeNameValue, linkValue);

    cardsList.prepend(newCard);

    inputNameFormProfile.value = "";
    inputLinkFormAddNewCard.value = "";

    closePopup(popupAdd);
}

addImageFormElement.addEventListener('submit', handleImageCreationSubmit);





const enableValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(enableValidationConfig);



Promise.all([fetchUserData(), fetchCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach(card => cardsList.append(createCard(card, card.owner._id === userId ? removeCard : null, showImage, toggleLike, card.likes.length)));

  })
  .catch((err) => {
    console.error('Error loading data:', err);
  });


