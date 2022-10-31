// -------------------------
// Импорты модулей
import { ppShowImage, openPopup, $popupEditJob, $popupNewPlace } from "./modal";

// -------------------------

export const $UI = (function () {
  const $UI = {
    photo: {},
    labelUserName: {},
    labelUserJob: {},
    uiEditButton: {},
    uiAddCardButton: {},
    cardList: {},
  };

  $UI.photo = document.querySelector(".profile__photo");
  $UI.labelUserName = document.querySelector(".profile__name");
  $UI.labelUserJob = document.querySelector(".profile__job");
  $UI.uiEditButton = document.querySelector(".profile__edit-button");
  $UI.uiAddCardButton = document.querySelector(".profile__add-button");
  $UI.cardList = document.querySelector(".elements__list");
  return $UI;
})();

export function initUIEvent() {
  $UI.cardList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("elements__like-button")) {
      evt.target.classList.toggle("elements__like-button_active");
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__delete-button")) {
      const $deletecardli = evt.target.closest(".elements__item");
      $deletecardli.remove();
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__image")) {
      ppShowImage(evt);
      evt.stopPropagation();
    }
  });
  $UI.uiEditButton.addEventListener("click", () => {
    $popupEditJob.popupName.value = $UI.labelUserName.textContent;
    $popupEditJob.popupJob.value = $UI.labelUserJob.textContent;
    openPopup($popupEditJob.popupWindow);
    // evt.stopPropagation();
  });
  $UI.uiAddCardButton.addEventListener("click", () => {
    openPopup($popupNewPlace.popupWindow);
    // evt.stopPropagation();
  });
}
