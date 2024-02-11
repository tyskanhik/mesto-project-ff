export function createCard(elem, { handleCardDelete, isLiked, openPopupImage }) {
    const cardElement = getTemplate()
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardDeleteButton.addEventListener('click', handleCardDelete)

    cardElementLink.addEventListener('click', () => openPopupImage(elem))

    cardLikeButton.addEventListener('click', isLiked)

    cardElementLink.src = elem.link;
    cardElementLink.alt = elem.name;
    cardElementTitle.textContent = elem.name;

    return cardElement;
}

const getTemplate = () => {
    return document
        .querySelector("#card-template")
        .content.querySelector(".places__item")
        .cloneNode(true);
};

export function isLiked(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

export function handleCardDelete(evt) {
    evt.target.closest('.card').remove();
}