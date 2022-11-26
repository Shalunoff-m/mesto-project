export class Api {
  static token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
  static group = "plus-cohort-16";
  static address = "https://nomoreparties.co";
  static headersContentType = {
    authorization: this.token,
    "Content-Type": "application/json",
  };
  static headersOnly = {
    authorization: this.token,
  };

  static baseUrl = `${this.address}/v1/${this.group}/`;

  static setParametr(opt) {
    this.token = opt.token;
    this.group = opt.group;
    this.address = opt.address;
  }

  constructor() {}

  // Просмотреть полученные данные в консоли
  showData(data) {
    console.log(data);
  }

  getInfo() {
    console.log(this.constructor.token);
    console.log(this.constructor.group);
    console.log(this.constructor.address);
  }

  // Публичный метод получения данных профиля
  getProfileData() {
    return fetch(`${this.constructor.baseUrl}users/me`, {
      headers: this.constructor.headersOnly,
    }).then(this._checkResponce);
  }

  // Получение всех карточек с сервера
  getCards() {
    return fetch(`${this.constructor.baseUrl}cards`, {
      headers: this.constructor.headersContentType,
    }).then(this._checkResponce);
  }

  // Удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this.constructor.baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this.constructor.headersOnly,
    }).then(this._checkResponce);
  }

  // Установка лайка
  addLike(id) {
    return fetch(`${this.constructor.baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: this.constructor.headersOnly,
    }).then(this._checkResponce);
  }

  // Удаление лайка
  removeLike(id) {
    return fetch(`${this.constructor.baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: this.constructor.headersOnly,
    }).then(this._checkResponce);
  }

  saveUserdata(data) {
    // console.log(data);
    return fetch(`${this.constructor.baseUrl}users/me`, {
      method: "PATCH",
      headers: this.constructor.headersContentType,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponce);
  }

  saveNewCard(data) {
    return fetch(`${this.constructor.baseUrl}cards`, {
      method: "POST",
      headers: this.constructor.headersContentType,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponce);
  }

  saveAvatar(data) {
    return fetch(`${this.constructor.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.constructor.headersContentType,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponce);
  }

  // Внутренний обработчик возвращаемых данных
  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
