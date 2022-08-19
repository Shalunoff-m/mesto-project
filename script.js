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

//Инициализация страницы
initialCards.forEach((element) => {
  cardCreate(element);
});

// Инициализация popup для редактирования профессии
const $jobBlock = document.querySelector(".profile");
const $profession = $jobBlock.querySelector(".profile__name");
const $name = $jobBlock.querySelector(".profile__job");
const $editButton = $jobBlock.querySelector(".profile__edit-button");

const $popupEditForm = document.querySelector("#popup-edit-job");
const $popupClose = $popupEditForm.querySelector(".popup__close");
const $popupName = $popupEditForm.querySelector("#popupEditname");
const $popupjob = $popupEditForm.querySelector("#popupEditjob");
const $popupSave = $popupEditForm.querySelector(".popup__submit");

$editButton.addEventListener("click", (evt) => {
  $popupEditForm.classList.toggle("popup_opened");
  $popupName.value = $name.textContent;
  $popupjob.value = $profession.textContent;
});

$popupClose.addEventListener("click", (evt) => {
  $popupEditForm.classList.toggle("popup_opened");
});

$popupSave.addEventListener("click", (evt) => {
  // debugger
  evt.preventDefault();
  $name.textContent = $popupName.value;
  $profession.textContent = $popupjob.value;
  $popupEditForm.classList.toggle("popup_opened");
  formElement.addEventListener('submit', formSubmitHandler);
});

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
  $cardContainer.append($cardli);
}
