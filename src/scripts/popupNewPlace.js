import { openPopup } from './openPopup.js'
import { closeSubmitPopup } from './closePopup.js'
import { setSubmitButtonState } from './validForms.js'
import { showCard } from './index.js'


const popupNewPlace = document.querySelector('.popup_type_new-card');
const buttonNewPlace = document.querySelector('.profile__add-button');
const form = document.forms['new-place'];
const newPlace = form.elements['place-name'];
const link = form.elements.link;
const buttonSubmit = form.querySelector('.popup__button ');
const urlRegExp = /^https?\:\/\//;


buttonNewPlace.addEventListener('click', () => {
    openPopup(popupNewPlace, form)
})

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const card = {};
    card.name = newPlace.value;
    card.link = link.value;

    showCard(card);

    form.reset();

    closeSubmitPopup(popupNewPlace); 
}

form.addEventListener('submit', handleFormSubmit);

form.addEventListener('input', () => {
    const isValid = newPlace.value.length > 0 && link.value.length > 0 && urlRegExp.test(link.value);
    setSubmitButtonState(isValid, buttonSubmit)
}); 