// копируем 

let cards = initialCards.slice();

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function delitedCard(element) {
    const deleteButton = element.querySelectorAll('.card__delete-button');
    // console.log(...deleteButton);
    deleteButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            button.parentElement.remove();
        })
    })
}

// @todo: Вывести карточки на страницу

cards.forEach((card) => {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    // console.log(cardElement);

    cardElement.querySelector('.card__title').textContent = card.name;
    
    placesList.append(cardElement);
})

delitedCard(placesList);
