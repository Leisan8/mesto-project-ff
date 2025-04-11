function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (!openedPopup) return;
        closePopup(openedPopup);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEsc);
}
