export function escPopupClose(keyCode, popup) {
    const ESCAPE = 27;
    if (keyCode == ESCAPE) {
        popup.classList.remove('popup_is-opened');
    }
}

export const closePopup = (namePopup) => {
    namePopup.addEventListener('click', (evt) => {
        if (
            evt.target.classList.contains('popup_type_image') ||
            evt.target.classList.contains('popup__close')
        ) {
            namePopup.classList.remove('popup_is-opened');
        }
    })
}