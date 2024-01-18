// копируем входящий массив с карточками

let cards = initialCards.slice();


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// модальные окна

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');


// @todo: Функция удаления карточки

function delitedCard(element) {
    const deleteButton = element.querySelectorAll('.card__delete-button');
    deleteButton.forEach((button) => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        })
    })
}

// @todo: Функция создания карточки
function createCards(card) {
    placesList.append(card);
    delitedCard(placesList);
}

// @todo: Вывести карточки на страницу

cards.forEach((card) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    createCards(cardElement)
})

