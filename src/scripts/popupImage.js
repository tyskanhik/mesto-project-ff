import { openPopup } from './openPopup.js'


const popupImage = document.querySelector('.popup_type_image');

export const openPopupImage = (card) => {
    popupImage.querySelector('.popup__image').
        src = card.link;
    popupImage.querySelector('.popup__caption').
        textContent = card.name;

    openPopup(popupImage)
}

