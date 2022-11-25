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
import {
  settings,
  activeElement,
  UIButtons,
} from "./../components/utils/constants";
import { UserInfo } from "../components/UserInfo";
//  ----------------------------------
// Основной код

// Объявляем инстансы
// Активация апи
const api = new Api();

// Создание и активация окна просмотра изображений
const popupPhotoShow = new PopupWithImage("#view-image");
popupPhotoShow.setEventListeners();

// Создание и активация окна новой карточки
const popupNewCard = new PopupWithForm("#popup-new-place", {
  formName: "popupNewPlace",
  handler: (data) => {
    api.saveNewCard(data).then((newCardData) => {
      cardSection.renderItem(newCardData);
    });
    console.log(data);
  },
});
popupNewCard.setEventListeners();

// Активация кнопок интерфейса
activeElement({
  selector: UIButtons.addCard,
  handler: () => {
    popupNewCard.open();
    console.log("press add button");
  },
});

const userInfo = new UserInfo({
  name: "profile__name",
  job: "profile__job",
  photo: "profile__photo",
});
const cardSection = new Section(
  {
    renderer: ({ item, position }) => {
      const card = new Card(
        {
          // Параметры создания карты
          data: item,
          template: "#card",
          id: userInfo.getUserInfo().id,
        },
        {
          onClick: (opt) => {
            popupPhotoShow.open(opt);
            console.log("Была попытка просмотра изображений");
          },
          onlike: (id) => {
            api.addLike(id).then((newData) => {
              card.setCounter(newData.likes);
              card.toggleLike();
              console.log("Был успешный лайк");
            });
          },
          onDislike: (id) => {
            api.removeLike(id).then((newData) => {
              card.setCounter(newData.likes);
              card.toggleLike();
              console.log("Был успешный дизлайк");
            });
          },
          onDelete: (id) => {
            api.deleteCard(id).then(() => {
              card.deleteCard();
            });

            console.log("Была попытка удаления");
          },
        }
      );
      const cardElement = card.getCard();
      cardSection.addItem(cardElement, position);
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
