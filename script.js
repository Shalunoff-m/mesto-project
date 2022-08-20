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
      $popupEditJob.closeOpen();
      $popupEditJob.popupName.value = $popupEditJob.nameText.textContent;
      $popupEditJob.popupJob.value = $popupEditJob.professionText.textContent;
    });
    // Событие закрытия окна
    $popupEditJob.closeButton.addEventListener("click", (evt) => {
      $popupEditJob.closeOpen();
    });
    // Событие записи результатов
    $popupEditJob.saveButton.addEventListener("click", (evt) => {
      // debugger
      evt.preventDefault();
      $popupEditJob.professionText.textContent = $popupEditJob.popupJob.value;
      $popupEditJob.nameText.textContent = $popupEditJob.popupName.value;
      $popupEditJob.closeOpen();
    });
  },
  closeOpen: function(){
    $popupEditJob.popupWindow.classList.toggle("popup_opened");
  },

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
  closeOpen: function(){
    $popupNewPlace.popupWindow.classList.toggle('popup_opened');
  },

  init: function () {
    $popupNewPlace.addButton = document.querySelector('.profile__add-button');
    $popupNewPlace.popupWindow = document.querySelector('#popup-new-place');
    $popupNewPlace.popupForm = $popupNewPlace.popupWindow.querySelector('#popupNewPlace');
    $popupNewPlace.popupPlace = $popupNewPlace.popupWindow.querySelector('#popupPlaceName');
    $popupNewPlace.popupLink = $popupNewPlace.popupWindow.querySelector('#LinkToImage');
    $popupNewPlace.closeButton = $popupNewPlace.popupWindow.querySelector('.popup__close');
    $popupNewPlace.saveButton = $popupNewPlace.popupWindow.querySelector('.popup__submit');

    //Описываем события
    $popupNewPlace.addButton.addEventListener("click", (evt) => {
      $popupNewPlace.closeOpen();
    });

    // Событие закрытия окна
    $popupNewPlace.closeButton.addEventListener("click", (evt) => {
      $popupNewPlace.closeOpen();
    });

    // Событие записи результатов
    $popupNewPlace.saveButton.addEventListener("click", (evt) => {
      // debugger
      evt.preventDefault();
      const newCard = {};
      newCard.name = $popupNewPlace.popupPlace.value;
      newCard.link = $popupNewPlace.popupLink.value;
      cardCreate(newCard);
      $popupNewPlace.closeOpen();

    });
  },
  closeOpen: function(){
    $popupNewPlace.popupWindow.classList.toggle("popup_opened");
  },

};


//Основные вызовы скрипты
initialCards.forEach((element) => {
  cardCreate(element);
});
// debugger;
$popupEditJob.init();
$popupNewPlace.init();


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
    // debugger;
    const $deletecardli = $cardDelete.closest(".elements__item");
    $deletecardli.remove();
  });

  // событие клика - установка лайка
  $cardLike.addEventListener("click", (event) => {
    // debugger;
    const $likeClick = event.target;
    $likeClick.classList.toggle("elements__like-button_active");
  });

  //Добавляем в DOM
  $cardContainer.prepend($cardli);
}
