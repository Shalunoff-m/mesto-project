//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import { Api } from "./../components/api";
import { Card } from "./../components/card";
import { Section } from "../components/section";
import { FormValidator } from "./../components/FormValidator";
import { Popup, PopupWithImage, PopupWithForm } from "../components/popup";
import { settings } from "./../components/utils/constants";
import { UserInfo } from "../components/UserInfo";
//  ----------------------------------
// Основной код

// Объявляем инстансы
const api = new Api();
const userInfo = new UserInfo({
  name: "profile__name",
  job: "profile__job",
  photo: "profile__photo",
});
const cardSection = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        {
          // Параметры создания карты
          data: item,
          template: "#card",
          id: userInfo.getUserInfo().id,
        },
        {
          onClick: () => {
            // [ ] Добавить обработчик с апи
            console.log("Была попытка просмотра изображений");
          },
          onlike: (id) => {
            // [x] Сделано
            console.log(id);
            api.addLike(id).then((newData) => {
              card.checkLike(newData);
            });
            console.log("Был лайк");
          },
          onDislike: (id) => {
            // [x] Сделано
            console.log(id);
            api.removeLike(id).then((newData) => {
              card.checkLike(newData);
            });
          },
          onDelete: () => {
            // [ ] Добавить обработчик с апи
            console.log("Была попытка удаления");
          },
        }
      );
      const cardElement = card.getCard();
      cardSection.addItem(cardElement, "end");
    },
  },
  ".elements__list"
);

// Забираем с сервера предварительные данные для работы
Promise.all([api.getProfileData(), api.getCards()]).then(
  ([profileData, cards]) => {
    userInfo.setUserInfo(profileData);
    cardSection.renderItems(cards);

    // const card = new Card();
  }
);
