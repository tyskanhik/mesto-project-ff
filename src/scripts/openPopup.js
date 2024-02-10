import { escPopupClose, closePopupCurrentTarget, closePopupHandleButton } from './closePopup.js'


export function openPopup(namePopup, form) {
    const butonPopupClose = namePopup.querySelector('.popup__close');

    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');


    function eventEscTarget(evt) {
        escPopupClose(evt.keyCode, namePopup, eventEscTarget, form)
    }

    document.addEventListener('keydown', eventEscTarget)

    function eventCurrentTarget(evt) {
        closePopupCurrentTarget(evt, namePopup, eventCurrentTarget, form)
    }

    namePopup.addEventListener('click', eventCurrentTarget)

    butonPopupClose.addEventListener('click', () => {
        closePopupHandleButton(namePopup, form)
    }, { once: true })
}