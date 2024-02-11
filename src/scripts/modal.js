export function openPopup(namePopup) {
    namePopup.classList.add('popup_is-animated');
    namePopup.classList.add('popup_is-opened');
    document.addEventListener("keyup", handleEscUp);
}

const handleEscUp = (evt) => {
    if (evt.key == "Escape") {
        const activePopup = document.querySelector(".popup_is-opened");
        closePopup(activePopup)
    }
}

export const closePopup = (namePopup) => {
    namePopup.classList.remove('popup_is-opened');
    document.removeEventListener("keyup", handleEscUp);
}

export const setCloseModalWindowEventListeners = (namePopup) => {
    const closeButtonElement = namePopup.querySelector(".popup__close")
    closeButtonElement.addEventListener("click", () => {
        closePopup(namePopup);
    });
    namePopup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(namePopup);
        }
    });
}