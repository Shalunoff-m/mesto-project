export class Section {
    constructor({items, renderer}, cardSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(cardSelector);
    }

    renderItems() {
        this._items.forEach(this._renderer);
    }

    addItem() {
        this._container.prepend(element);
    }
}