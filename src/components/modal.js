import { $UI } from "./ui.js";
import { createCards } from "./card.js";

// popup для работы с изображением

const $popupImageShow = (function () {
  const $pp = {
    img: "",
    imgName: "",
    popupWindow: {},
    popupImage: {},
    popupTextImage: {},
  };

  $pp.popupWindow = document.querySelector("#view-image");
  $pp.popupImage = $pp.popupWindow.querySelector(".popup__image");
  $pp.popupTextImage = $pp.popupWindow.querySelector(".popup__imageName");
  return $pp;
})();

export const $popupEditJob = (function () {
  const $pp = {
    popupWindow: {},
    popupForm: {},
    popupName: {},
    popupJob: {},
    saveButton: {},
  };

  $pp.popupWindow = document.querySelector("#popup-edit-job");
  $pp.popupForm = document.forms.popupEditForm;
  $pp.popupName = $pp.popupForm.elements.name;
  $pp.popupJob = $pp.popupForm.elements.job;
  $pp.saveButton = $pp.popupWindow.querySelector(".popup__submit");
  // $pp.popupForm = $pp.popupWindow.querySelector("#popupEditForm");
  // $pp.popupName = $pp.popupWindow.querySelector("#popupEditname");
  // $pp.popupJob = $pp.popupWindow.querySelector("#popupEditjob");
  // $pp.saveButton = $pp.popupWindow.querySelector(".popup__submit");
  return $pp;
})();

export const $popupNewPlace = (function () {
  const $pp = {
    popupWindow: {},
    popupForm: {},
    popupPlace: {},
    popupLink: {},
    saveButton: {},
  };
  // debugger;
  $pp.popupWindow = document.querySelector("#popup-new-place");
  $pp.popupForm = document.forms.popupNewPlace;
  $pp.popupPlace = $pp.popupForm.elements.name;
  $pp.popupLink = $pp.popupForm.elements.link;
  $pp.saveButton = $pp.popupWindow.querySelector(".popup__submit");

  // $pp.popupWindow = document.querySelector("#popup-new-place");
  // $pp.popupForm = $pp.popupWindow.querySelector("#popupNewPlace");
  // $pp.popupPlace = $pp.popupWindow.querySelector("#popupPlaceName");
  // $pp.popupLink = $pp.popupWindow.querySelector("#LinkToImage");
  // $pp.saveButton = $pp.popupWindow.querySelector(".popup__submit");

  return $pp;
})();

export function initModal() {
  $popupEditJob.popupForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    $UI.labelUserJob.textContent = $popupEditJob.popupJob.value;
    $UI.labelUserName.textContent = $popupEditJob.popupName.value;
    closePopup(evt);
  });
  $popupNewPlace.popupForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let cardItem = [
      {
        name: $popupNewPlace.popupPlace.value,
        link: $popupNewPlace.popupLink.value,
      },
    ];
    createCards(cardItem);
    closePopup(evt);
  });
}

export function ppShowImage(evt) {
  const imageClick = evt.target.closest(".elements__item");
  const cardName = imageClick.querySelector(".elements__caption").textContent;
  const cardUrl = imageClick
    .querySelector(".elements__image")
    .getAttribute("src");

  $popupImageShow.popupImage.setAttribute("src", cardUrl);
  $popupImageShow.popupImage.setAttribute("alt", cardName);
  $popupImageShow.popupTextImage.textContent = cardName;
  openPopup($popupImageShow.popupWindow);
}

export function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  popupWindow.addEventListener("click", closePopup);
}

function closePopup(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") ||
    evt.type === "submit"
  ) {
    const popupWindow = evt.target.closest(".popup");
    popupWindow.classList.remove("popup_opened");
    // debugger;
    popupWindow.removeEventListener("click", closePopup);
    evt.stopPropagation();
  }
}
