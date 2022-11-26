export class Card {
  constructor(
    { data, template, id },
    { onClick, onlike, onDislike, onDelete } // onImageClick, // onDeleteCard, // setLike, // removeLike
  ) {
    // Записываем данные карты с сервера
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;

    // Записываем id из секции профиля
    this._userId = id;

    // Записываем шаблон
    this._template = template;

    // Внешние обработчики
    this._onClick = onClick;
    this._onDelete = onDelete;
    this._onlike = onlike;
    this._onDislike = onDislike;
  }

  // Получение шаблона
  _getTemplate() {
    // FIXME здесь подозрительный порядок вызовы и поиска элементов
    this._card = document
      .querySelector(this._template)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return this._card;
  }

  //Создание новой карточки
  getCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__image");
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    this._likesCounter = this._element.querySelector(".elements__like-counter");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._element.querySelector(".elements__caption").textContent = this._name;
    this._setEventListeners();
    this._checkDeleteButton();

    this._checklike();
    // console.log(this._data);

    return this._element;
  }

  //Установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("elements__like-button_active")) {
        this._onDislike(this._id);
      } else {
        this._onlike(this._id);
      }
    });

    this._image.addEventListener("click", () => {
      this._onClick({ src: this._link, text: this._name });
    });

    this._deleteButton.addEventListener("click", () => {
      this._onDelete(this._id);
    });
  }

  //Проверка владельца карточки
  _checkDeleteButton() {
    if (this._cardOwnerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
  }

  _checklike() {
    this._likesCounter.textContent = this._likes.length;
    this._likes.forEach((element) => {
      if (element._id === this._userId) {
        this.toggleLike();
        this._likesCounter.textContent = this._likes.length;
      }
    });
  }

  setCounter(likesArray) {
    this._likesCounter.textContent = likesArray.length;
  }

  toggleLike() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }
}
