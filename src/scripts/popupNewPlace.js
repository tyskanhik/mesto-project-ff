import { openPopup } from './openPopup.js'

const popupNewPlace = document.querySelector('.popup_type_new-card');
const buttonNewPlace = document.querySelector('.profile__add-button');


buttonNewPlace.addEventListener('click', () => {
    openPopup(popupNewPlace)
})