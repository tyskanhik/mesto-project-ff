/** @module validation */

/**
 * 
 * @param { HTMLFormElement } formElement Форма
 * @param { HTMLInputElement } inputElement Поле ввода формы
 * @param { Text } errorMessage Текст ошибки
 * @param { Object } configValidation Конфиг объект
 * @description Функция показывает ошибки
 */
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configValidation.errorClass);
}

/**
 * 
 * @param { HTMLFormElement } formElement Форма
 * @param { HTMLInputElement } inputElement Поле ввода формы
 * @param { Object } configValidation Конфиг объект
 * @description Функция скрывает ошибки
 */
const hideInputError = (formElement, inputElement, configValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = ' ';
}

/**
 * 
 * @param { HTMLFormElement } formElement Форма
 * @param { HTMLInputElement } inputElement Поле ввода формы
 * @param { Object } configValidation Конфиг объект
 * @description Функция проверяет валидно ли поле ввода и если поле невалидно из-за 'pattern' то выводит сообщение из 'dataset' иначе выводит стандартное сообщение об ошибке
 */
const checkInputValidity = (formElement, inputElement, configValidation) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
    } else {
        hideInputError(formElement, inputElement, configValidation);
    }
};


/**
 * 
 * @param { HTMLFormElement } formElement Форма
 * @param { Object } configValidation Конфиг объект
 * @description Функция перебирает поля ввода форм вешает на них обработчик 'input'
 */
const setEventListeners = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, configValidation);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


/**
 * 
 * @param { Object } configValidation Конфиг объект
 * @description Функция перебирает все формы в DOM дереве
 */
export function enableValidation(configValidation) {
    const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configValidation);
    });
}

/**
 * 
 * @param { HTMLInputElement } inputList Поля ввода форм
 * @returns { Boolean } Проверка валидности полей ввода
 */
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

/**
 * 
 * @param { HTMLInputElement } inputList Поля ввода форм
 * @param { HTMLButtonElement } buttonElement Конпки отправки форм
 * @description переключение кнопки в состояние 'disabled' в зависимости от валидности
 */
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true
    } else {
        buttonElement.disabled = false
    }
}

/**
 * 
 * @param { HTMLFormElement } formElement Форма
 * @param { Object } configValidation Конфиг объект
 * @description Очистка ошибок и переключение состояния кнопки в 'disabled'
 */
export const clearValidation = (formElement, configValidation) => {
    const errorElements = formElement.querySelectorAll(configValidation.inputError);
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
    buttonElement.disabled = true
}