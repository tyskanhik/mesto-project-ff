// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция удаления карточки

function handleDelitedCardButton(button) {
    button.closest('.places__item').remove();
}


// @todo: Функция создания карточки

function createCard(elem) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardElementLink = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title')
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardDeleteButton.addEventListener('click', () => {
        handleDelitedCardButton(cardDeleteButton);
    })

    cardElementLink.src = elem.link;
    cardElementLink.alt = elem.name;
    cardElementTitle.textContent = elem.name;
    
    const card = cardElement;
    return card;
}


// @todo: Вывести карточки на страницу

function showCards(elem) {
    const card = createCard(elem);
    cardsContainer.prepend(card);
}

initialCards.forEach((elem) => {
    showCards(elem);
})