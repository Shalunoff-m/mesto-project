export default class Popup {
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
