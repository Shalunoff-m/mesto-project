export class Popup {
  static closeBtnSelector = "popup__close";
  static showPopupSelector = "popup_opened";

  // статическая функция перенастройки класса
  static reset(opt) {
    this.closeBtnSelector = opt.closeBtnSelector;
    this.showPopupSelector = opt.showPopupSelector;
  }

  constructor(selector) {
    this._modal = document.querySelector(selector);
  }

  open() {
    this._setKeyListener();
    this._modal.classList.add(this.constructor.showPopupSelector);
  }

  close() {
    this._modal.classList.remove("popup_opened");
    this._removeKeyListener();
  }

  _checkClick(evt) {
    if (evt.target.classList.contains(this.constructor.closeBtnSelector))
      return true;
    if (evt.target.classList.contains("popup")) return true;
    if (evt.key === "Escape") return true;
    if (evt.type === "submit") return true;
    return false;
  }

  handleEscClose = (evt) => {
    this._handleClose(evt);
  };

  _handleClose = (evt) => {
    if (this._checkClick(evt)) {
      this.close();
    }
  };

  _setKeyListener() {
    document.addEventListener("keydown", this.handleEscClose);
  }

  _removeKeyListener() {
    document.removeEventListener("keydown", this.handleEscClose);
  }

  setEventListeners() {
    this._modal.addEventListener("mousedown", this._handleClose);
  }
}

// Попап с картинкой -----------------------------------------------
export class PopupWithImage extends Popup {
  static imageSelector = ".popup__image";
  static textSelector = ".popup__imageName";

  constructor(selector) {
    super(selector);
    this._image = this._modal.querySelector(this.constructor.imageSelector);
    this._text = this._modal.querySelector(this.constructor.textSelector);
  }

  open({ src, text }) {
    this._image.setAttribute("src", src);
    this._image.setAttribute("alt", text);
    this._text.textContent = text;
    super.open();
  }
}

// Попап с формой -----------------------------------------------
export class PopupWithForm extends Popup {
  static submitButton = "popup__submit";

  constructor(selector, { formName, handler }) {
    super(selector);
    this._formHandler = handler;
    this._form = document.forms[formName];
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
    Array.from(this._form.querySelectorAll("input")).forEach((element) => {
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
      this._handleClose(evt);
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
    Array.from(this._form.elements).forEach((element) => {
      element.value = data[element.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
