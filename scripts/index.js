// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция удаления карточки

function handleCardDelete(card) {
    card.remove();
}


// @todo: Функция создания карточки

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardDeleteButton.addEventListener('click', () => {
        handleCardDelete(cardElement);
    })

    cardElementLink.src = cardData.link;
    cardElementLink.alt = cardData.name;
    cardElementTitle.textContent = cardData.name;
    
    return cardElement;
}


// @todo: Вывести карточки на страницу

function showCard(elem) {
    const card = createCard(elem);
    cardsContainer.prepend(card);
}

initialCards.forEach((elem) => {
    showCard(elem);
})