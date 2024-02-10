import { openPopup } from './openPopup.js'
import { closeSubmitPopup } from './closePopup.js'
import { setSubmitButtonState } from './validForms.js'

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const form = document.forms['edit-profile']
const name = form.elements.name;
const description = form.elements.description;
const buttonSubmit = form.querySelector('.popup__button ');


buttonEditProfile.addEventListener('click', () => {
    name.value = profileTitle.textContent;
    description.value = profileDescription.textContent;
    openPopup(popupEditProfile);
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = name.value;
    profileDescription.textContent = description.value;

    closeSubmitPopup(popupEditProfile);
}

form.addEventListener('submit', handleFormSubmit);

form.addEventListener('input', () => {
    const isValid = name.value.length > 0 && description.value.length > 0;
    setSubmitButtonState(isValid, buttonSubmit)
}); 