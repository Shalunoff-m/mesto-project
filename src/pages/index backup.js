import "./index.css";

// Начальный массив карточек
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
  saveButton: {},
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
  saveButton: {},
};

// Объект для работы с изображением
const $popupImageShow = {
  img: "",
  imgName: "",
  popupWindow: {},
  popupImage: {},
  popupTextImage: {},
  receiveObject: function (cardName, cardUrl) {
    $popupImageShow.popupImage.setAttribute("src", cardUrl);
    $popupImageShow.popupImage.setAttribute("alt", cardName);
    $popupImageShow.popupTextImage.textContent = cardName;
    openPopup($popupImageShow.popupWindow);
  },
};

// ПОИСК ОБЪЕКТОВ В DOM ->
// ФОРМА ЖАКА КУСТО
$popupEditJob.jobBlock = document.querySelector(".profile");
$popupEditJob.professionText =
  $popupEditJob.jobBlock.querySelector(".profile__job");
$popupEditJob.nameText = $popupEditJob.jobBlock.querySelector(".profile__name");
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
$popupEditJob.saveButton =
  $popupEditJob.popupWindow.querySelector(".popup__submit");

$popupEditJob.editButton.addEventListener("click", (evt) => {
  openPopup($popupEditJob.popupWindow);
  $popupEditJob.popupName.value = $popupEditJob.nameText.textContent;
  $popupEditJob.popupJob.value = $popupEditJob.professionText.textContent;
});

// Событие записи результатов
$popupEditJob.popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  $popupEditJob.professionText.textContent = $popupEditJob.popupJob.value;
  $popupEditJob.nameText.textContent = $popupEditJob.popupName.value;
  closePopup($popupEditJob.popupWindow);
});
//------------------------------------------------------------------------------
// ФОРМА НОВОГО МЕСТА
$popupNewPlace.addButton = document.querySelector(".profile__add-button");
$popupNewPlace.popupWindow = document.querySelector("#popup-new-place");
$popupNewPlace.popupForm =
  $popupNewPlace.popupWindow.querySelector("#popupNewPlace");
$popupNewPlace.popupPlace =
  $popupNewPlace.popupWindow.querySelector("#popupPlaceName");
$popupNewPlace.popupLink =
  $popupNewPlace.popupWindow.querySelector("#LinkToImage");
$popupNewPlace.saveButton =
  $popupNewPlace.popupWindow.querySelector(".popup__submit");

//Описываем события
$popupNewPlace.addButton.addEventListener("click", (evt) => {
  openPopup($popupNewPlace.popupWindow);
});

// Событие записи результатов
$popupNewPlace.popupWindow.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {};
  newCard.name = $popupNewPlace.popupPlace.value;
  newCard.link = $popupNewPlace.popupLink.value;
  prependCard(newCard);
  closePopup($popupNewPlace.popupWindow);
  // Очистка инпутов
  $popupNewPlace.popupPlace.value = "";
  $popupNewPlace.popupLink.value = "";
});
//------------------------------------------------------------------------------
// ФОРМА ПРОСМОТРА ИЗОБРАЖЕНИЙ
$popupImageShow.popupWindow = document.querySelector("#view-image");
$popupImageShow.popupImage =
  $popupImageShow.popupWindow.querySelector(".popup__image");
$popupImageShow.popupTextImage =
  $popupImageShow.popupWindow.querySelector(".popup__imageName");
//------------------------------------------------------------------------------
// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНОВ КАРТОЧЕК
const $cardContainer = document.querySelector(".elements__list");
const $templateCard = document.querySelector("#card").content;

// Универсальное событие закрытия окна
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const $popup = button.closest(".popup");
  // debugger;
  button.addEventListener("click", () => closePopup($popup));
});

//Универсальная функция открытия popup
function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
}

//Универсальная функция закрытия popup
function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_opened");
}

// Создание карт из первоначального массива
initialCards.forEach(prependCard);

function prependCard(cardItem) {
  const $carditem = getCard(cardItem);
  $cardContainer.prepend($carditem);
}

// Функция создания карточки
function getCard(cardItem) {
  // Клонируем элементы шаблона
  const $newCard = $templateCard.cloneNode(true);
  const $cardName = $newCard.querySelector(".elements__caption");
  const $cardImage = $newCard.querySelector(".elements__image");
  const $cardLike = $newCard.querySelector(".elements__like-button");
  const $cardDelete = $newCard.querySelector(".elements__delete-button");
  // Назначаем параметры
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
  $cardImage.addEventListener("click", () => {
    const imageClick = $cardImage.closest(".elements__item");
    const cardName = imageClick.querySelector(".elements__caption").textContent;
    const cardUrl = imageClick
      .querySelector(".elements__image")
      .getAttribute("src");
    $popupImageShow.receiveObject(cardName, cardUrl);
  });
  return $newCard;
}