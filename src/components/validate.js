export function enableValidate(...arrModal) {
  //
  arrModal.forEach((currentForm) => {
    //
    setEventListeners(currentForm.form, currentForm.savebutton);
  });

  function setEventListeners(form, bt) {
    const inputList = Array.from(
      form.querySelectorAll(".basic-data-input__input")
    );
    toggleButtonState(inputList, bt);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input);
        toggleButtonState(inputList, bt);
      });
    });
  }

  function isValid(form, input) {
    let validationMS = input.validationMessage;
    if (input.validity.valueMissing) {
      validationMS = `Вы пропустили это поле`;
    } else {
      validationMS = input.validationMessage;
    }

    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      showInputError(form, input, validationMS);
    } else {
      hideInputError(form, input);
    }
  }

  function toggleButtonState(inputList, bt) {
    if (hasInvalidInput(inputList)) {
      bt.disabled = true;
    } else {
      bt.disabled = false;
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  function showInputError(form, input, error) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add("basic-data-input__input_type_error");
    formError.classList.add("basic-data-input__input-error_active");
    formError.textContent = error;
  }

  function hideInputError(form, input) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove("basic-data-input__input_type_error");
    formError.classList.remove("basic-data-input__input-error_active");
    formError.textContent = "Верно";
  }
}
