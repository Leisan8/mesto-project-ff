import './pages/index.css'; 

import { createCard, removeCard, toggleLike} from './components/cards.js';
import { openPopup, closePopup } from './components/modals.js';

import { clearValidation, enableValidation} from './components/validation.js';

import { fetchUserData, fetchCards, addNewCardOnServer, updateProfileDetialsOnServer, updateProfileAvatarOnServer} from './components/api.js';

// @todo: Темплейт карточки
const cardsList = document.querySelector('.places__list')
const popupImage = document.querySelector('.popup_type_image');
const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const formUpdateAvatar = popupAvatar.querySelector('.popup__form'); 

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


addButton.addEventListener('click', () => {
    const openedForm = popupAdd.querySelector('.popup__form');
    clearValidation(openedForm, enableValidationConfig);
    openPopup(popupAdd)
});


closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt) => {
        const openedPopup = evt.target.closest('.popup');
        closePopup(openedPopup);
        
        const openedForm = openedPopup.querySelector('.popup__form');
        if (openedForm) {
            clearValidation(openedForm, enableValidationConfig);
        }
    });
})


popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);

            const openedPopup = evt.target.closest('.popup');
            const openedForm = openedPopup.querySelector('.popup__form');
            if (openedForm) {
                clearValidation(openedForm, enableValidationConfig);
            }
        }
    })
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    
    const submitButton = evt.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value

    updateProfileDetialsOnServer(name, job)
        .then((res) => {
            closePopup(popupEdit);
            // Вставьте новые значения с помощью textContent
            profileName.textContent = res.name;
            profileJob.textContent = res.about;

        })
        .catch(err => console.log(err))
        .finally(() => {
            submitButton.textContent = originalButtonText;
        });
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);


function handleImageCreationSubmit(evt) {
    evt.preventDefault(); 
    const submitButton = evt.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const placeNameValue = inputNameFormProfile.value;
    const linkValue = inputLinkFormAddNewCard.value

    addNewCardOnServer(placeNameValue, linkValue)
        .then((res) =>{
            const cardData = {name: res.name, link: res.link, likes: res.likes, _id: res._id};
            const newCard = createCard(cardData, removeCard, showImage, toggleLike);
            cardsList.prepend(newCard);
            inputNameFormProfile.value = "";
            inputLinkFormAddNewCard.value = "";
            closePopup(popupAdd);
        })
        .catch((err) => {
            console.error('Error loading data:', err);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
        });
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

    cards.forEach(card => cardsList.append(createCard(card, card.owner._id === userId ? removeCard : null, showImage, toggleLike, card.likes.length, userId)));

  })
  .catch((err) => {
    console.error('Error loading data:', err);
  });


  profileAvatar.addEventListener('click', (evt) => {
    const openedForm = popupAvatar.querySelector('.popup__form');
    clearValidation(openedForm, enableValidationConfig);
    openPopup(popupAvatar);
  })

  formUpdateAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = evt.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const openedPopup = evt.target.closest('.popup');
    const openedForm = openedPopup.querySelector('.popup__form');
    const newAvatarLink = popupAvatar.querySelector('.popup__input_type_url').value

    updateProfileAvatarOnServer(newAvatarLink)
        .then((res) => {
            profileImage.style.backgroundImage = `url('${res.avatar}')`;

            closePopup(popupAvatar);
            clearValidation(openedForm, enableValidationConfig);
        })
        .catch(err => console.log(err))
        .finally(() => {
            submitButton.textContent = originalButtonText;
        });

  })