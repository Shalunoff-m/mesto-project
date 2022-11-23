export class Popup {
  static closeBtnSelector = ".popup__close";

  constructor(selector) {
    this._modal = document.querySelector(selector);
    this._closeButton = this._modal.querySelector(
      this.constructor.closeBtnSelector
    );
  }

  open() {
    this._setKeyListener();
    this._modal.classList.add("popup_opened");
  }

  close() {
    this._modal.classList.remove("popup_opened");
    this._removeKeyListener();
  }

  _checkClick(evt) {
    if (evt.target.classList.contains("popup__close")) return true;
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
  constructor(selector, { formName, handler }) {
    super(selector);
    this._formHandler = handler;
    this._form = document.forms[formName];
  }

  showData() {}

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

  close() {
    super.close();
    this._form.reset();
  }
}
