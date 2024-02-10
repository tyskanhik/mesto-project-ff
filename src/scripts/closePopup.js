export const escPopupClose = (keyCode, popup, eventEscTarget, form) => {
    const ESCAPE = 27;
    if (keyCode == ESCAPE) {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', eventEscTarget)
        form.reset();
    }
}

export const closePopupHandleButton = (popup, form) => {
    popup.classList.remove('popup_is-opened')
    form.reset();
}


export const closePopupCurrentTarget = (evt, popup, name, form) => {
    if (evt.currentTarget == evt.target) {
        evt.currentTarget.classList.remove('popup_is-opened')
        popup.removeEventListener('click', name)
        form.reset();
    }
}

export const closeSubmitPopup = (popup) => {
    popup.classList.remove('popup_is-opened');
}