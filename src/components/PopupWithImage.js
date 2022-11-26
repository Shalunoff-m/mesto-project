import Popup from "./popup";
// Попап с картинкой -----------------------------------------------
export default class PopupWithImage extends Popup {
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
