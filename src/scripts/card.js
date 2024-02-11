export function createCard(...arg) {
    const cardElement = getTemplate()
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardDeleteButton.addEventListener('click', (evt) => {
        if (!!evt) {
            arg[1](cardElement)
        }
    })

    cardElementLink.addEventListener('click', () => {
        arg[3](arg[0])
    })

    cardLikeButton.addEventListener('click', () => {
        arg[2](cardLikeButton)
    })

    cardElementLink.src = arg[0].link;
    cardElementLink.alt = arg[0].name;
    cardElementTitle.textContent = arg[0].name;

    return cardElement;
}

const getTemplate = () => {
    return document
        .querySelector("#card-template")
        .content.querySelector(".places__item")
        .cloneNode(true);
};

export function isLiked(elem) {
    elem.classList.toggle('card__like-button_is-active')
}

export function handleCardDelete(card) {
    card.remove();
}