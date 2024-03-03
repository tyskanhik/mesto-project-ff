import '../pages/index.css'
import { myObjKey, setNewCard, setEditProfile, setEditAvatar, loadPage, setDeliteCard } from './api.js'
import { createCard, isLiked, handleCardDelete } from './card.js'
import { openPopup, closePopup, setCloseModalWindowEventListeners } from './modal.js'
import { clearValidation, enableValidation } from './validation.js'


/**
 * @description Объект с DOM узлами
 */
const DOM = {
    popupImage: document.querySelector('.popup_type_image'),
    popupImageCaption: document.querySelector('.popup__caption'),
    popupImageLink: document.querySelector('.popup__image'),
    cardsContainer: document.querySelector('.places__list'),
    popupNewPlace: document.querySelector('.popup_type_new-card'),
    buttonNewPlace: document.querySelector('.profile__add-button'),
    formNewPlase: document.forms['new-place'],
    popupEditProfile: document.querySelector('.popup_type_edit'),
    buttonEditProfile: document.querySelector('.profile__edit-button'),
    profileTitle: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__description'),
    formEditProfile: document.forms['edit-profile'],
    popupEditAvatar: document.querySelector('.popup_type_edit-avatar'),
    imageAvatar: document.querySelector('.profile__image'),
    formEditAvatar: document.forms['edit-profile-avatar'],
    popupDeletionConfirmation: document.querySelector('.popup_type_delite'),
    formDeliteCard: document.forms['delit-card']
}

/**
 * @description Конфиг объект валидации
 */
const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    inputError: '.input-error'
}

const cacheLastHandleDelitCard = {
    id: '',
    card: {}
}

/**
 * 
 * @param { object } elem Объект карточки
 * @param { Text } myId Мой id
 * @param { boolean } isAppend флаг переключения методов вставки карточек на страницу
 * @description Отображение карточек на страницу при флаге true вставляет карточку вконец при флаге false в начало
 */
function showCard(elem, myId, isAppend) {
    const card = createCard(elem, myId, { isLiked, openPopupImage, deletionConfirmation });
    isAppend ? DOM.cardsContainer.append(card) : DOM.cardsContainer.prepend(card);
}

/**
 * 
 * @param { object } profile Объект с моим профилем
 */
const loadProfile = (profile) => {
    DOM.profileTitle.textContent = profile.name;
    DOM.profileDescription.textContent = profile.about;
    DOM.imageAvatar.style.backgroundImage = `url(${profile.avatar})`
}

/**
 * 
 * @param { EventListener } evt Событие отправки формы
 * @description Обработка события отправки формы с редактированием профиля
 */
function handleSubmitEditProfile(evt) {
    evt.preventDefault();
    const nameEditProfile = DOM.formEditProfile.elements.name;
    const description = DOM.formEditProfile.elements.description;
    const button = DOM.formEditProfile.querySelector('.button');
    button.textContent = 'Сохранение...'

    const profile = {
        name: nameEditProfile.value,
        about: description.value
    }

    setEditProfile(profile)
        .then((res) => {
            loadProfile(res)
            closePopup(DOM.popupEditProfile)
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Сохранить')
}
DOM.buttonEditProfile.addEventListener('click', () => {
    const nameEditProfile = DOM.formEditProfile.elements.name;
    const description = DOM.formEditProfile.elements.description;

    nameEditProfile.value = DOM.profileTitle.textContent;
    description.value = DOM.profileDescription.textContent;

    clearValidation(DOM.formEditProfile, configValidation)
    openPopup(DOM.popupEditProfile);
    setCloseModalWindowEventListeners(DOM.popupEditProfile)
})
DOM.formEditProfile.addEventListener('submit', handleSubmitEditProfile);

/**
 * 
 * @param { EventListener } evt Событие отправки формы
 * @description Обработка события отправки формы с созданием новой карточки
 */
function handleSubmitNewPlase(evt) {
    evt.preventDefault();

    const newPlace = DOM.formNewPlase.elements['place-name'];
    const link = DOM.formNewPlase.elements.link;
    const button = DOM.formNewPlase.querySelector('.button');
    button.textContent = 'Сохранение...'
    const card = {};
    card.name = newPlace.value;
    card.link = link.value;

    setNewCard(card)
        .then(card => {
            showCard(card, myObjKey.myId, false);
            closePopup(DOM.popupNewPlace);
            DOM.formNewPlase.reset();
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Создать')
}
DOM.buttonNewPlace.addEventListener('click', () => {
    DOM.formNewPlase.reset();
    clearValidation(DOM.formNewPlase, configValidation)
    openPopup(DOM.popupNewPlace)
})
DOM.formNewPlase.addEventListener('submit', handleSubmitNewPlase);

/**
 * 
 * @param { EventListener } evt Событие отправки формы
 * @description Обработка события отправки формы с изменением аватара
 */
function handleSubmitEditAvatar(evt) {
    evt.preventDefault()

    const link = DOM.formEditAvatar.elements['new_avatar']
    const button = DOM.formEditAvatar.querySelector('.button')
    button.textContent = 'Сохранение...'

    setEditAvatar(link.value)
        .then(res => {
            loadProfile(res)
            closePopup(DOM.popupEditAvatar);
        })
        .catch((err) => console.log(err))
        .finally(() => button.textContent = 'Сохранить')
}
DOM.imageAvatar.addEventListener('click', () => {
    DOM.formEditAvatar.reset()
    clearValidation(DOM.formEditAvatar, configValidation)
    openPopup(DOM.popupEditAvatar)
})
DOM.formEditAvatar.addEventListener('submit', handleSubmitEditAvatar)

/**
 * 
 * @param { object } card Объект с данными карточки
 * @description Обработка открытия попапа с картинкой
 */
function openPopupImage(card) {
    DOM.popupImageLink.src = card.link;
    DOM.popupImageCaption.textContent = card.name;
    DOM.popupImageCaption.alt = card.name;

    openPopup(DOM.popupImage)
}

/**
 * 
 * @param { object } elem Объект карточки
 * @param { EventListener } evt Событие клик по иконке удалить карточку
 * @description Открывает модальное окно с подтверждением и заносит данные в caches
 */
const deletionConfirmation = (elem, evt) => {
    openPopup(DOM.popupDeletionConfirmation)
    caches.id = elem._id
    caches.card = evt.target.closest('.card')
}
DOM.formDeliteCard.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const button = DOM.formDeliteCard.querySelector('.popup__button')
    handleCardDelete(caches, button, DOM.popupDeletionConfirmation)
})

enableValidation(configValidation)

document.querySelectorAll('.popup').forEach(popup => {
    setCloseModalWindowEventListeners(popup);
    popup.classList.add('popup_is-animated');
});

loadPage()
    .then(res => {
        const [card, profile] = res;
        card.forEach(card => showCard(card, profile._id, true))
        loadProfile(profile)
    })
    .catch((err) => console.log(err))