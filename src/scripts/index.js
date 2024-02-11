import '../pages/index.css'
import { initialCards } from './cards.js'
import { createCard, handleCardDelete, isLiked } from './card.js'
import { openPopup, closePopup, setCloseModalWindowEventListeners } from './modal.js'



// @todo: DOM узлы
export const popupImage = document.querySelector('.popup_type_image');
const cardsContainer = document.querySelector('.places__list');

const popupNewPlace = document.querySelector('.popup_type_new-card');
const buttonNewPlace = document.querySelector('.profile__add-button');
const formNewPlase = document.forms['new-place'];

const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile']
const name = formEditProfile.elements.name;
const description = formEditProfile.elements.description;


function showCard(elem, boolean) {
    const card = createCard(elem, { handleCardDelete, isLiked, openPopupImage });
    boolean ? cardsContainer.append(card) : cardsContainer.prepend(card);
}

initialCards.forEach((elem) => {
    showCard(elem, true);
})

function openPopupImage(card) {
    popupImage.querySelector('.popup__image').
        src = card.link;
    popupImage.querySelector('.popup__caption').
        textContent = card.name;

    openPopup(popupImage)
    setCloseModalWindowEventListeners(popupImage)
}

buttonNewPlace.addEventListener('click', () => {
    openPopup(popupNewPlace)
    setCloseModalWindowEventListeners(popupNewPlace)
})

function handleSubmitNewPlase(evt) {
    evt.preventDefault();

    const newPlace = formNewPlase.elements['place-name'];
    const link = formNewPlase.elements.link;

    const card = {};
    card.name = newPlace.value;
    card.link = link.value;

    showCard(card, false);

    formNewPlase.reset();

    closePopup(popupNewPlace);
}

formNewPlase.addEventListener('submit', handleSubmitNewPlase);

buttonEditProfile.addEventListener('click', () => {
    name.value = profileTitle.textContent;
    description.value = profileDescription.textContent;

    openPopup(popupEditProfile);
    setCloseModalWindowEventListeners(popupEditProfile)
})

function handleSubmitEditProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = name.value;
    profileDescription.textContent = description.value;

    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleSubmitEditProfile);