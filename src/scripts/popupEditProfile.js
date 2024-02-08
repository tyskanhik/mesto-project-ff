import { openPopup } from './openPopup.js'

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');


buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile)
})