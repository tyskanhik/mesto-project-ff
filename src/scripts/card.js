/** @module card */

import { setLikes } from './api'

/**
 * 
 * @param { Array<obj> } elem Объект карточки
 * @param { Text } myId Мой id
 * @param { Array<obj>} param2 функции колбеки
 * @returns { HTMLElement } Готовая карточка
 * @description создание карточки и навешивание обработчиков лайков, кнопки удаления и открытия попапа с картинкой
 */
export function createCard(elem, myId, { isLiked, openPopupImage, deletionConfirmation }) {
    const cardElement = getTemplate()
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-number')

    if (elem.owner._id == myId) {
        const cardDeleteButton = createDeliteBtnCard()
        cardElement.prepend(cardDeleteButton)
        cardDeleteButton.addEventListener('click', (evt) => deletionConfirmation(elem, evt))
    }

    cardLikeCounter.textContent = elem.likes.length
    elem.likes.map(likes => myLiked(likes._id, cardLikeButton, myId))

    cardElementLink.addEventListener('click', () => openPopupImage(elem))

    cardLikeButton.addEventListener('click', (evt) => {
        isLiked(evt, elem)
    })

    cardElementLink.src = elem.link;
    cardElementLink.alt = elem.name;
    cardElementTitle.textContent = elem.name;

    return cardElement;
}

/**
 * 
 * @returns { HTMLTemplateElement } Темплейт
 */
const getTemplate = () => {
    return document
        .querySelector("#card-template")
        .content.querySelector(".places__item")
        .cloneNode(true);
}

/**
 * 
 * @param { Text } likeId id лайка на карточке
 * @param { HTMLButtonElement } cardLikeButton Иконка лайка
 * @param { Text } myId Мой id
 */
const myLiked = (likeId, cardLikeButton, myId) => {
    if (likeId == myId) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }
}

/**
 * 
 * @param { EventListener } evt Событие клик на иконке сердца
 * @param { object } elem Объект карточки
 * @description Обработка постановки и снятия лайков
 */
export function isLiked(evt, elem) {
    console.log(elem);
    evt.target.classList.toggle('card__like-button_is-active');
    let method = ''
    if (evt.target.classList.contains('card__like-button_is-active')) {
        method = 'PUT'
    } else {
        method = 'DELETE'
    }

    setLikes(method, elem._id)
        .then((result) => {
            evt.target.closest('.places__item').querySelector('.card__like-number')
                .textContent = result.likes.length
        })
        .catch((err) => console.log(err))
}


/**
 * 
 * @returns { HTMLButtonElement } Кнопка удаления карточки
 */
const createDeliteBtnCard = () => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('card__delete-button');

    return button
}