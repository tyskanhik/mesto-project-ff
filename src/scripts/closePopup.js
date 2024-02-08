
export const escPopupClose = (keyCode, popup) =>{
    const ESCAPE = 27;
    if (keyCode == ESCAPE) {
        popup.classList.remove('popup_is-opened');
    }
}

export const closePopupHandleButton = (popup) => {
    popup.classList.remove('popup_is-opened')
}


export const closePopupCurrentTarget = (evt, popup, name) => {
    if(evt.currentTarget == evt.target){
        evt.currentTarget.classList.remove('popup_is-opened')
        popup.removeEventListener('click', name)
    }
}