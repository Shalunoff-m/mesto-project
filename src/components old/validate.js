export function enableValidate(opt) {
  document.querySelectorAll(`${opt.form}`).forEach((currentForm) => {
    const popup = currentForm.closest(`${opt.popup}`);
    const saveButton = popup.querySelector(`${opt.savebutton}`);
    setEventListeners(currentForm, saveButton);
  });

  function setEventListeners(form, bt) {
    const inputList = Array.from(form.querySelectorAll(`${opt.input}`));
    toggleButtonState(inputList, bt);
    //
    form.addEventListener("reset", () => {
      setTimeout(() => {
        toggleButtonState(inputList, bt);
      }, 0);
    });
    //
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
    input.classList.add(opt.inputError);
    formError.classList.add(opt.labelError);
    formError.textContent = error;
  }

  function hideInputError(form, input) {
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(opt.inputError);
    formError.classList.remove(opt.labelError);
    formError.textContent = opt.validInput;
  }
}

// сброс всех полей формы
export function resetForm(popup) {
  popup.form.reset();
  popup.savebutton.setAttribute("disabled", true);
}
