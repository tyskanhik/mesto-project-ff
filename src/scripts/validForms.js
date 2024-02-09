export function setSubmitButtonState(isValid, addButton) {
    if(!isValid) {
        addButton.setAttribute('disabled', true);
    } else {
    addButton.removeAttribute('disabled');
    }
}