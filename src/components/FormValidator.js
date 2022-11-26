export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.formInput)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.formSubmit
    );
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this.toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
    } else {
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(input) {
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
      this._showInputError(input, validationMS);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, error) {
    // debugger;
    const formError = this._formElement.querySelector(`.${input.id}-error`);
    // console.log(formError);
    input.classList.add(this._settings.inputError.slice(1));
    formError.classList.add(this._settings.labelError.slice(1));
    formError.textContent = error;
  }

  _hideInputError(input) {
    // debugger;
    const formError = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputError.slice(1));
    formError.classList.remove(this._settings.labelError.slice(1));
    formError.textContent = "Информация";
  }

  enableValidation() {
    this._setEventListeners();
  }
}
