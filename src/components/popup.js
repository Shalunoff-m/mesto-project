export class Popup {
  static closeBtnSelector = ".popup__close";

  constructor(selector) {
    this._modal = document.querySelector(selector);
    this._closeButton = this._modal.querySelector(
      this.constructor.closeBtnSelector
    );
    // this._handleClose = this._handleClose.bind(this);
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
    // debugger;
    document.removeEventListener("keydown", this._handleClose);
  }
}
