import Popup from "./popup";

// Попап с формой -----------------------------------------------
export default class PopupWithForm extends Popup {
  static submitButton = "popup__submit";

  constructor(selector, { formName, handler }) {
    super(selector);
    this._formHandler = handler;
    this._form = document.forms[formName];
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector(
      `.${this.constructor.submitButton}`
    );
    this._buttonName = this._submitButton.textContent;
  }

  // Установка нового текста на кнопке
  setButtonName(text) {
    this._submitButton.textContent = text;
  }

  // Восстановление названия кнопки из хранилища
  restoreButtonName() {
    this._submitButton.textContent = this._buttonName;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((element) => {
      data[element.name] = element.value;
      // console.log(element);
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formHandler(this._getInputValues());
      // this._handleClose(evt);
    });
  }

  open(data) {
    if (data) {
      this._setFormData(data);
    }
    super.open();
  }

  _setFormData(data) {
    // debugger;
    this._inputList.forEach((element) => {
      element.value = data[element.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
