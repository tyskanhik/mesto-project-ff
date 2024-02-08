import { escPopupClose, closePopup } from './closePopup.js'


export function openPopup(namePopup) {
    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        escPopupClose(evt.keyCode, namePopup)
    }, { once: true })

    closePopup(namePopup);
}