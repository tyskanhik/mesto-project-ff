/** @module modal */

/**
 * 
 * @param { HTMLElement } namePopup Модальное окно
 * @description Открытие модального окна
 */
export function openPopup(namePopup) {
    namePopup.classList.add('popup_is-opened');
    document.addEventListener("keyup", handleEscUp);
}

/**
 * 
 * @param { Event } evt keyup
 * @description Обработка нажатия клавиши escape для закрытия модального окна
 */
const handleEscUp = (evt) => {
    if (evt.key == "Escape") {
        const activePopup = document.querySelector(".popup_is-opened");
        closePopup(activePopup)
    }
}

/**
 * 
 * @param { HTMLElement } namePopup Модальное окно
 * @description Закрытие модального окна
 */
export const closePopup = (namePopup) => {
    namePopup.classList.remove('popup_is-opened');
    document.removeEventListener("keyup", handleEscUp);
}

/**
 * 
 * @param { HTMLElement } namePopup Модальное окно
 * @description Обработка закрытия модального окна по клику на кнопку закрыть и оверлею  
 */
export const setCloseModalWindowEventListeners = (namePopup) => {
    const closeButtonElement = namePopup.querySelector(".popup__close")
    closeButtonElement.addEventListener("click", () => {
        closePopup(namePopup);
    });
    namePopup.addEventListener("mousedown", (evt) => {
        if (evt.target == evt.currentTarget) {
            closePopup(namePopup);
        }
    });
}