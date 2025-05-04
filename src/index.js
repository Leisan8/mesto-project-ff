import './pages/index.css'; 
import { initialCards } from './components/initial_cards.js';

import { createCard, removeCard, toggleLike} from './components/cards.js';
import { openPopup, closePopup } from './components/modals.js';

// @todo: Темплейт карточки
const cardsList = document.querySelector('.places__list')
const popupImage = document.querySelector('.popup_type_image');
const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cards = initialCards.map(cardData => createCard(cardData, removeCard, showImage, toggleLike));

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

cards.forEach((card) => {
    cardsList.append(card);
})


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
  
  
  function enableValidation(config) {
    const allForms = document.querySelectorAll(config.formSelector);

    allForms.forEach((form) => {
        const allInputs = form.querySelectorAll(config.inputSelector);
        
        allInputs.forEach((input) => {
            input.addEventListener('input', () => {
                isValid(input, form.querySelector(`.${input.id}-error`), config.inputErrorClass, config.errorClass);
                toggleButtonState(allInputs, form.querySelector(config.submitButtonSelector), config.inactiveButtonClass);
            })
        })
    })
  }

  enableValidation(enableValidationConfig);


// Передадим текст ошибки вторым параметром
const showInputError = (formError, element, errorMessage, inputErrorClass, errorClass) => {
    element.classList.add(inputErrorClass);
    // Заменим содержимое span с ошибкой на переданный параметр
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
  };
  
  const hideInputError = (formError, element, inputErrorClass, errorClass) => {
    element.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    // Очистим ошибку
    formError.textContent = '';
  };
  
  const isValid = (formInput, formError, inputErrorClass, errorClass) => {
    if (!formInput.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом 
      const errorMessage =  formInput.validity.patternMismatch ? formInput.dataset.errorMessage : formInput.validationMessage;   
      showInputError(formError, formInput, errorMessage, inputErrorClass, errorClass);
      return false;
    } else {
      hideInputError(formError, formInput, inputErrorClass, errorClass);
      return true;
    }
  };


  function clearValidation(form, validationConfig) {
    const allInputs = form.querySelectorAll(validationConfig.inputSelector);
    allInputs.forEach((input) => {
        hideInputError(form.querySelector(`.${input.id}-error`), input, validationConfig.inputErrorClass, validationConfig.errorClass);
    })
  }


// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return Array.from(inputList).some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };
  