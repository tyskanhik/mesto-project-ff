export function openPopup(namePopup) {
    const butonPopupClose = namePopup.querySelector('.popup__close');

    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');

    function eventEscTarget(evt) {
        escPopupClose(evt, namePopup, eventEscTarget)
    }

    document.addEventListener('keydown', eventEscTarget)

    namePopup.addEventListener('click', closePopupCurrentTarget)

    butonPopupClose.addEventListener('click', () => {
        closePopup(namePopup)
    }, { once: true })
}

const escPopupClose = (evt, popup, func) => {
    if (evt.code == "Escape") {
        closePopup(popup, func)
    }
}

const closePopupCurrentTarget = (evt) => {
    if (evt.currentTarget == evt.target) {
        closePopup(evt.currentTarget)
    }
}

export const closePopup = (popup, func) => {
    popup.classList.remove('popup_is-opened');
    popup.addEventListener('click', closePopupCurrentTarget)
    document.addEventListener('keydown', func)
}
