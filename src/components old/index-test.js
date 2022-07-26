// BM js/ Основной js код

// Проверка перенастройки сервера
// Api.setParametr({
//   token: "269e9438-b227-400f-84a0-3e13cb6c82c577777",
//   group: "plus-cohort-20",
//   address: "https://nomorepartiesawdawd.co",
// });

// Создаем инстанс для работы с апи
const api = new Api();
const userInfo = new UserInfo({
  name: "profile__name",
  job: "profile__job",
  photo: "profile__photo",
});

// TODO Решить как лучше внедрять Api, непосредственно передать сам метод Апи, или все таки вызывать метод из индекса, а его данные передавать методу.
api.getProfileData().then((data) => {
  userInfo.setUserInfo(data);
  // console.log();
});

const popupAvatar = new PopupWithForm("#popup-avatar", {
  formName: "popup-avatar-form",
  handler: (data) => {
    // console.log(data);
    api.saveAvatar(data).then((newData) => {
      userInfo.setUserInfo(newData);
    });
  },
});
popupAvatar.setEventListeners();
// popupAvatar.setButtonName("Прыщ");
// popupAvatar.restoreButtonName();

document
  .querySelector(".profile__add-button")
  .addEventListener("click", (evt) => {
    popupAvatar.open(userInfo.getUserInfo());
  });

// Запрос параметров соединения с сервером
// api.getInfo();

// Создание новой карточки
const insertCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: "#card",
    userId: userId,
    handleCardClick: (name, link) => {
      PopupWithImage.open(name, link);
    },
    onDeleteCard: (id) => {},
    setLike: (id) => {
      api
        .addLike(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    removeLike: (id) => {
      api
        .removeLike(id)
        .then((data) => {
          card.handleCardLike(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.getCard();
  return cardElement;
};

// Инстанс секции
const section = new Section(
  {
    items: api.getCards(),
    renderer: (card) => {
      section.addItem(insertCard(card));
    },
  },
  ".content__elements"
);

// Проверка на просмотр карточки
/* const popupImage = new PopupWithImage("#view-image");
document
  .querySelector(".profile__add-button")
  .addEventListener("click", (evt) => {
    // popupNewPlace.open();
    popupImage.open({
      src: "https://images.unsplash.com/photo-1669023030485-573b6a75ab64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      text: "Какой-то дом",
    });
  }); */

// Проверка модалки формы

// PopupWithForm.reset({
//   closeBtnSelector: "popup__close2",
//   showPopupSelector: "popup2_opened",
// });
