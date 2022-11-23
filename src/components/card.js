export class Card {
    constructor(data, cardSelector, userId, handleCardClick, onDeleteCard, setLike, removeLike) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._onDeleteCard = onDeleteCard;
        this._setLike = setLike;
        this._removeLike = removeLike;
        this._cardOwnerId = data.owner._id;
    }

    // Получение шаблона
    _getTemplate() {
        this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
    return this._card
    }

    //Установка слушателей
    _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
        if (this._likeButton.classList.contains('elements__like-button_active')) {
            this._removeLike(this._id);
        } else {
            this._setLike(this._id);
            }
          })
          
    this._image.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
          })

    this._deleteButton.addEventListener('click', () => {
        this._onDeleteCard(this._id);
          })
    }

    //Проверка владельца карточки
    _checkDeleteButton() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteButton.remove();
          }
    }

    // Удаление карточки
    deleteCard() {
        this._element.remove();
      }
    
    //Создание новой карточки
    getCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.elements__image');
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._likesCounter = this._element.querySelector('.elements__like-counter');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.elements__caption').textContent = this._name;
        this._setEventListeners();
        this._isActive();
        this._checkDeleteButton();
        this._likesCounter.textContent = this._likes.length;

        return this._element;

    }

    //Проверка лайка
    isActive() {
        if (this._likeButton.classList.contains("elements__like-button_active")) {
            return true;
          }
          return false;
    }

    //Установка/Снятие лайка
    handleCardLike(data) {
        this._likes = data.likes;
        this._likesCounter.textContent = this._likes.length;
        this._likeButton.classList.toggle("elements__like-button_active");
    }
}