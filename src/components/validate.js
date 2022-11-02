export function enableValidate(modal) {
  // TODO JS/ Остановился здесь
  const formError = modal.form.querySelector(`.${modal.name.id}-error`);
  formError.textContent = "Ошибка найдена";
  console.log(formError);

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
