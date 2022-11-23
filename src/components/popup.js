export class Popup {
  static closeBtnSelector = ".popup__close";

  constructor(selector) {
    this._modal = document.querySelector(selector);
    this._closeButton = this._modal.querySelector(
      this.constructor.closeBtnSelector
    );
  }

  // Метод для тестирования данных
  show() {
    console.log({ modal: this._modal, btn: this._closeButton });
  }

  open() {
    this.setEventListeners();
    this._modal.classList.add("popup_opened");
  }

  close() {
    this._modal.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _checkClick(evt) {
    if (evt.target.classList.contains("popup__close")) return true;
    if (evt.target.classList.contains("popup")) return true;
    if (evt.key === "Escape") return true;
    return false;
  }

  _handleClose = (evt) => {
    if (this._checkClick(evt)) {
      this.close();
    }
  };

  setEventListeners() {
    this._modal.addEventListener("mousedown", this._handleClose);
    document.addEventListener("keydown", this._handleClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleClose);
  }
}

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

  showData() {
    console.log({ image: this._image, text: this._text });
  }
}
