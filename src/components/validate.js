export function enableValidate(modal) {
  // console.log(form);

  function showInputError(element) {
    element.classList.add("basic-data-input__input_type_error");
  }
  function hideInputError(element) {
    element.classList.remove("basic-data-input__input_type_error");
  }

  function isValid() {
    if (!modal.name.validity.valid) {
      showInputError(modal.name);
    } else {
      hideInputError(modal.name);
    }
  }
  modal.name.addEventListener("input", isValid);
}
