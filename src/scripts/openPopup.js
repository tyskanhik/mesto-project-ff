import { escPopupClose, closePopupCurrentTarget, closePopupHandleButton } from './closePopup.js'


export function openPopup(namePopup) {
    const butonPopupClose = namePopup.querySelector('.popup__close');

    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        escPopupClose(evt.keyCode, namePopup)
    }, { once: true })


    function eventCurrentTarget(evt) {
        closePopupCurrentTarget(evt, namePopup, eventCurrentTarget)
    }

    namePopup.addEventListener('click', eventCurrentTarget)

    butonPopupClose.addEventListener('click', () => {
        closePopupHandleButton(namePopup)
    }, { once: true })
}