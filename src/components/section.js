export class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  // FIXME Скорее всего здесь не хватает аргумента при передаче
  addItem() {
    this._container.prepend(element);
  }
}
