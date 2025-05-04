export function enableValidation(config) {
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


export  function clearValidation(form, validationConfig) {
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
  