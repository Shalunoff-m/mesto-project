export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer({ item: item, position: "end" });
    });
  }

  renderItem(item) {
    this._renderer({ item: item, position: "start" });
  }

  addItem(element, type) {
    if (type === "start") {
      this._container.prepend(element);
    }
    if (type === "end") {
      this._container.append(element);
    }
  }
}
