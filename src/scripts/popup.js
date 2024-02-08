const popupImage = document.querySelector('.popup_type_image');
const popupEdit = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');



export const openPopupImage = (card) => {
    popupImage.querySelector('.popup__image').
        src = card.link;
    popupImage.querySelector('.popup__caption').
        textContent = card.name;

    openPopup(popupImage)
}

function openPopup(namePopup) {
    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        escPopupClose(evt.keyCode, namePopup)
    }, { once: true })

    closePopup(namePopup);
}

function escPopupClose(keyCode, popup) {
    const ESCAPE = 27;
    if (keyCode == ESCAPE) {
        popup.classList.remove('popup_is-opened');
    }
}

const closePopup = (namePopup) => {
    namePopup.addEventListener('click', (evt) => {
        if (
            evt.target.classList.contains('popup_type_image') || 
            evt.target.classList.contains('popup__close')
        ) {
            namePopup.classList.remove('popup_is-opened');
        }
    })
}
