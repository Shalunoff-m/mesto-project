//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import Api from "../components/Api";
import Card from "../components/Сard";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import {
  settings,
  activeElement,
  UIButtons,
  popupAddCard,
  popupEditAvatar,
  popupEditProfile,
} from "./../components/utils/constants";
import UserInfo from "../components/UserInfo";
//  ----------------------------------
// Основной код

// Активация апи
const api = new Api();

// Создание и активация окна просмотра изображений
const popupPhotoShow = new PopupWithImage("#view-image");
popupPhotoShow.setEventListeners();

// Создание и активация окна аватара
const popupAvatarEdit = new PopupWithForm("#popup-avatar", {
  formName: "popup-avatar",
  handler: (data) => {
    popupAvatarEdit.setButtonName("Сохранение...");
    api
      .saveAvatar(data)
      .then((newProfileData) => {
        userInfo.setUserInfo(newProfileData);
        popupAvatarEdit.restoreButtonName();
        popupAvatarEdit.close();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  },
});
popupAvatarEdit.setEventListeners();

// Создание и активация окна новой карточки
const popupNewCard = new PopupWithForm("#popup-new-place", {
  formName: "popupNewPlace",
  handler: (data) => {
    popupNewCard.setButtonName("Сохранение...");
    api
      .saveNewCard(data)
      .then((newCardData) => {
        cardSection.renderItem(newCardData);
        popupNewCard.restoreButtonName();
        popupNewCard.close();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  },
});
popupNewCard.setEventListeners();

// Создание и активация окна профиля
const popupUserInfo = new PopupWithForm("#popup-edit-job", {
  formName: "popupEditForm",
  handler: (data) => {
    popupUserInfo.setButtonName("Сохранение...");
    api
      .saveUserdata(data)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData);
        popupUserInfo.restoreButtonName();
        popupUserInfo.close();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  },
});
popupUserInfo.setEventListeners();

// Активация кнопок интерфейса
activeElement({
  selector: UIButtons.addCard,
  handler: () => {
    popupNewCard.open();
    addCardValidator.toggleButtonState();
  },
});
activeElement({
  selector: UIButtons.editInfo,
  handler: () => {
    popupUserInfo.open(userInfo.getUserInfo());
    editProfileValidator.toggleButtonState();
  },
});
activeElement({
  selector: UIButtons.changeAvatar,
  handler: () => {
    popupAvatarEdit.open(userInfo.getUserInfo());
    editAvatarValidator.toggleButtonState();
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
            //console.log("Была попытка просмотра изображений");
          },
          onlike: (id) => {
            api
              .addLike(id)
              .then((newData) => {
                card.setCounter(newData.likes);
                card.toggleLike();
                //console.log("Был успешный лайк");
              })
              .catch((error) => {
                console.log(error);
              });
          },
          onDislike: (id) => {
            api
              .removeLike(id)
              .then((newData) => {
                card.setCounter(newData.likes);
                card.toggleLike();
                //console.log("Был успешный дизлайк");
              })
              .catch((error) => {
                console.log(error);
              });
          },
          onDelete: (id) => {
            api
              .deleteCard(id)
              .then(() => {
                card.deleteCard();
              })
              .catch((error) => {
                console.log(error);
              });
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
Promise.all([api.getProfileData(), api.getCards()])
  .then(([profileData, cards]) => {
    userInfo.setUserInfo(profileData);
    cardSection.renderItems(cards);

    // const card = new Card();
  })
  .catch((error) => {
    console.log(error);
  });

//Валидация
const editProfileValidator = new FormValidator(settings, popupEditProfile);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(settings, popupAddCard);
addCardValidator.enableValidation();
const editAvatarValidator = new FormValidator(settings, popupEditAvatar);
editAvatarValidator.enableValidation();
