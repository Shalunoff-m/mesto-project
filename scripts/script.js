const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Объект для работы с формой Жака Кусто
const $popupEditJob = {
  // текстовые данные
  jobBlock: {},
  professionText: "",
  nameText: "",
  // Интерактивные элементы
  editButton: {},
  // Подтягиваем элементы соответствующего popup
  popupWindow: {},
  popupForm: {},
  popupName: {},
  popupJob: {},
  closeButton: {},
  saveButton: {},
  init: function () {
    $popupEditJob.jobBlock = document.querySelector(".profile");
    $popupEditJob.professionText =
      $popupEditJob.jobBlock.querySelector(".profile__job");
    $popupEditJob.nameText =
      $popupEditJob.jobBlock.querySelector(".profile__name");
    // Интерактивные элементы
    $popupEditJob.editButton = $popupEditJob.jobBlock.querySelector(
      ".profile__edit-button"
    );
    // Собираем объекты формы Редактирования профиля
    $popupEditJob.popupWindow = document.querySelector("#popup-edit-job");
    $popupEditJob.popupForm =
      $popupEditJob.popupWindow.querySelector("#popupEditForm");
    $popupEditJob.popupName =
      $popupEditJob.popupWindow.querySelector("#popupEditname");
    $popupEditJob.popupJob =
      $popupEditJob.popupWindow.querySelector("#popupEditjob");
    $popupEditJob.closeButton =
      $popupEditJob.popupWindow.querySelector(".popup__close");
    $popupEditJob.saveButton =
      $popupEditJob.popupWindow.querySelector(".popup__submit");

    // Событие открытия окна
    $popupEditJob.editButton.addEventListener("click", (evt) => {
      openPopup($popupEditJob.popupWindow);
      $popupEditJob.popupName.value = $popupEditJob.nameText.textContent;
      $popupEditJob.popupJob.value = $popupEditJob.professionText.textContent;
    });
    // Событие закрытия окна
    $popupEditJob.closeButton.addEventListener("click", (evt) => {
      closePopup($popupEditJob.popupWindow);
    });
    // Событие записи результатов
    $popupEditJob.saveButton.addEventListener("click", (evt) => {
      // debugger
      evt.preventDefault();
      $popupEditJob.professionText.textContent = $popupEditJob.popupJob.value;
      $popupEditJob.nameText.textContent = $popupEditJob.popupName.value;
      closePopup($popupEditJob.popupWindow);
    });
  }
};

// Объект для работы с формой нового места
const $popupNewPlace = {
  // Интерактивные элементы
  addButton: {},
  // Подтягиваем элементы соответствующего popup
  popupWindow: {},
  popupForm: {},
  popupPlace: {},
  popupLink: {},
  closeButton: {},
  saveButton: {},
  init: function () {
    $popupNewPlace.addButton = document.querySelector(".profile__add-button");
    $popupNewPlace.popupWindow = document.querySelector("#popup-new-place");
    $popupNewPlace.popupForm =
      $popupNewPlace.popupWindow.querySelector("#popupNewPlace");
    $popupNewPlace.popupPlace =
      $popupNewPlace.popupWindow.querySelector("#popupPlaceName");
    $popupNewPlace.popupLink =
      $popupNewPlace.popupWindow.querySelector("#LinkToImage");
    $popupNewPlace.closeButton =
      $popupNewPlace.popupWindow.querySelector(".popup__close");
    $popupNewPlace.saveButton =
      $popupNewPlace.popupWindow.querySelector(".popup__submit");

    //Описываем события
    $popupNewPlace.addButton.addEventListener("click", (evt) => {
      openPopup($popupNewPlace.popupWindow);
    });

    // Событие закрытия окна
    $popupNewPlace.closeButton.addEventListener("click", (evt) => {
      closePopup($popupNewPlace.popupWindow);
    });

    // Событие записи результатов
    $popupNewPlace.saveButton.addEventListener("click", (evt) => {
      // debugger
      evt.preventDefault();
      const newCard = {};
      newCard.name = $popupNewPlace.popupPlace.value;
      newCard.link = $popupNewPlace.popupLink.value;
      cardCreate(newCard);
      closePopup($popupNewPlace.popupWindow);
      // Очистка инпутов
      $popupNewPlace.popupPlace.value = "";
      $popupNewPlace.popupLink.value = "";
    });
  },
  closeOpen: function () {
    $popupNewPlace.popupWindow.classList.toggle("popup_opened");
  },
};

// Объект для работы с изображением
const $popupImageShow = {
  img: "",
  imgName: "",
  popupWindow: {},
  popupImage: {},
  popupTextImage: {},
  closePopupButton: {},

  init: function () {
    $popupImageShow.popupWindow = document.querySelector("#view-image");
    $popupImageShow.popupImage =
      $popupImageShow.popupWindow.querySelector(".popup__image");
    $popupImageShow.popupTextImage =
      $popupImageShow.popupWindow.querySelector(".popup__imageName");
    $popupImageShow.closePopupButton =
      $popupImageShow.popupWindow.querySelector(".popup__close");

    // Событие закрытия
    $popupImageShow.closePopupButton.addEventListener("click", (evt) => {
      closePopup($popupImageShow.popupWindow);
    });
  },

  receiveObject: function (cardClick) {
    $popupImageShow.img = cardClick
      .querySelector(".elements__image")
      .getAttribute("src");
    $popupImageShow.imgName =
      cardClick.querySelector(".elements__caption").textContent;
    $popupImageShow.popupImage.setAttribute("src", $popupImageShow.img);
    $popupImageShow.popupImage.setAttribute("alt", $popupImageShow.imgName);
    $popupImageShow.popupTextImage.textContent = $popupImageShow.imgName;
    openPopup($popupImageShow.popupWindow);
  }
};

/////////////////////////////
//Основные вызовы
initialCards.forEach((element) => {
  cardCreate(element);
});

$popupEditJob.init();
$popupNewPlace.init();
$popupImageShow.init();
/////////////////////////////

//Универсальная функция открытия popup
function openPopup(popupWindow) {
  let isopenPopup = popupWindow.classList.contains("popup_opened");
  if (!isopenPopup) {
    popupWindow.classList.add("popup_opened");
  } else {
    return;
  }
}

//Универсальная функция закрытия popup
function closePopup(popupWindow) {
  let isopenPopup = popupWindow.classList.contains("popup_opened");
  if (isopenPopup) {
    popupWindow.classList.remove("popup_opened");
  } else {
    return;
  }
}

// Функция создания карточки
function cardCreate(cardItem) {
  const $templateCard = document.querySelector("#card").content;
  const $cardli = $templateCard.cloneNode(true);
  const $cardName = $cardli.querySelector(".elements__caption");
  const $cardImage = $cardli.querySelector(".elements__image");
  const $cardLike = $cardli.querySelector(".elements__like-button");
  const $cardDelete = $cardli.querySelector(".elements__delete-button");
  const $cardContainer = document.querySelector(".elements__list");
  //Назначение параметров
  $cardName.textContent = cardItem.name;
  $cardImage.setAttribute("src", cardItem.link);
  $cardImage.setAttribute("alt", cardItem.name);

  // Событие клика - удаление карты
  $cardDelete.addEventListener("click", (event) => {
    const $deletecardli = $cardDelete.closest(".elements__item");
    $deletecardli.remove();
  });

  // событие клика - установка лайка
  $cardLike.addEventListener("click", (event) => {
    const $likeClick = event.target;
    $likeClick.classList.toggle("elements__like-button_active");
  });

  // Открытие просмотра изображения на полный экран
  $cardImage.addEventListener("click", (evt) => {
    const imageClick = $cardImage.closest(".elements__item");
    $popupImageShow.receiveObject(imageClick);
  });

  //Добавляем в DOM
  $cardContainer.prepend($cardli);
}
