import { initialCards } from './cards.js'
import { openPopupImage } from './popupImage.js'
import { isLiked } from './isLiked.js'


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция удаления карточки

function handleCardDelete(card) {
    card.remove();
}


// @todo: Функция создания карточки

function createCard(cardData, handleCardDelete, isLiked) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeBbutton = cardElement.querySelector('.card__like-button');

    cardDeleteButton.addEventListener('click', () => {
        handleCardDelete(cardElement);
    })

    cardElementLink.addEventListener('click', () => {
        openPopupImage(cardData)
    })

    cardLikeBbutton.addEventListener('click', () => {
        isLiked(cardLikeBbutton)
    })

    cardElementLink.src = cardData.link;
    cardElementLink.alt = cardData.name;
    cardElementTitle.textContent = cardData.name;

    return cardElement;
}


// @todo: Вывести карточки на страницу

export function showCard(elem) {
    const card = createCard(elem, handleCardDelete, isLiked);
    cardsContainer.prepend(card);
}

initialCards.forEach((elem) => {
    showCard(elem);
})