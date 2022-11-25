export class UserInfo {
  // 'селектор элемента имени пользователя','селектор информации о себе'
  constructor({ name, job, photo }) {
    this._nameElement = document.querySelector(`.${name}`);
    this._jobElement = document.querySelector(`.${job}`);
    this._avatarElement = document.querySelector(`.${photo}`);
    this._name = null;
    this._job = null;
    this._id = null;
    this._avatar = null;
    this._cohort = null;
  }

  getUserInfo() {
    return {
      avatar: this._avatar,
      name: this._name,
      job: this._job,
      id: this._id,
    };

    /*   который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится. */
  }

  setUserInfo(data) {
    this._name = data.name;
    this._job = data.about;
    this._id = data._id;
    this._avatar = data.avatar;
    this._cohort = data.cohort;
    this._renderProfile();
  }

  _renderProfile() {
    this._nameElement.textContent = this._name;
    this._jobElement.textContent = this._job;
    this._avatarElement.setAttribute("src", this._avatar);
  }

  /* который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу. */
}
