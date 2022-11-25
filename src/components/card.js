export class Card {
  constructor(
    { data, template, id },
    { onClick, onlike, onDislike, onDelete } // onImageClick, // onDeleteCard, // setLike, // removeLike
  ) {
    // Записываем данные карты с сервера
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._isliked = null;

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

  //Установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._isliked ? this._onDislike(this._id) : this._onlike(this._id);
    });

    this._image.addEventListener("click", () => {
      this._onClick();
      // this._onImageClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._onDelete();
      // this._onDeleteCard(this._id);
    });
  }

  //Проверка владельца карточки
  _checkDeleteButton() {
    if (this._cardOwnerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  // Функция проверки постановки лайка пользователем
  checkLike(data) {
    data.likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likesCounter.textContent = data.likes.length;
        this._isliked = true;
        this._setLike();
      } else {
        this._likesCounter.textContent = data.likes.length;
        this._isliked = false;
        this._removeLike();
      }
    });
  }

  _setLike() {
    this._likeButton.classList.add("elements__like-button_active");
  }
  _removeLike() {
    this._likeButton.classList.remove("elements__like-button_active");
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
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
    this.checkLike(this.data);
    // this._isActive();
    this._likesCounter.textContent = this._likes.length;

    return this._element;
  }

  /*   //Проверка лайка
  isActive() {
    if (this._likeButton.classList.contains("elements__like-button_active")) {
      return true;
    }
    return false;
  } */

  //Установка/Снятие лайка
  handleCardLike(data) {
    this._likes = data.likes;
    this._likesCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("elements__like-button_active");
  }
}
