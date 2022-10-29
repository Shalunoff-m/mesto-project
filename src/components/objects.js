// --------------------------------------------
// НАЧАЛЬНЫЙ МАССИВ КАРТОЧЕК

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

// --------------------------------------------
// ЭЛЕМЕНТЫ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА
const userFormElements = {
  userPageBlock: {},
  btKustoEditProfile: {},
  btKustoEditphoto: {},
  labelName: "",
  labelJob: "",
};

userFormElements.userPageBlock = document.querySelector(".content__profile");
userFormElements.btKustoEditProfile =
  userFormElements.userPageBlock.querySelector(".profile__edit-button");
userFormElements.labelName =
  userFormElements.userPageBlock.querySelector(".profile__name");
userFormElements.labelJob =
  userFormElements.userPageBlock.querySelector(".profile__job");

// --------------------------------------------
// МОДАЛЬНОЕ ОКНО ДЛЯ ПРОСМОТРА ИЗОБРАЖЕНИЙ
const $popupImageShow = {
  popupWindow: {},
  popupImage: {},
  popupTextImage: {},
};

$popupImageShow.popupWindow = document.querySelector("#view-image");
$popupImageShow.popupImage =
  $popupImageShow.popupWindow.querySelector(".popup__image");
$popupImageShow.popupTextImage =
  $popupImageShow.popupWindow.querySelector(".popup__imageName");

// --------------------------------------------
// МОДАЛЬНОЕ ОКНО ЖАКА КУСТО

const $popupEditJob = {
  // текстовые данные
  jobBlock: {},
  // Интерактивные элементы
  editButton: {},
  // Подтягиваем элементы соответствующего popup
  popupWindow: {},
  popupForm: {},
  popupName: {},
  popupJob: {},
  saveButton: {},
};

// --------------------------------------------
// ФОРМА ЖАКА КУСТО
$popupEditJob.popupWindow = document.querySelector("#popup-edit-job");
$popupEditJob.popupForm =
  $popupEditJob.popupWindow.querySelector("#popupEditForm");
$popupEditJob.popupName =
  $popupEditJob.popupWindow.querySelector("#popupEditname");
$popupEditJob.popupJob =
  $popupEditJob.popupWindow.querySelector("#popupEditjob");
$popupEditJob.saveButton =
  $popupEditJob.popupWindow.querySelector(".popup__submit");

export { initialCards };
