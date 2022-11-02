//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { getObj, getDataForm } from "./../components/utils";
import { enableValidate } from "./../components/validate";
import { renderCards } from "./../components/card";
import {
  renderUserProfile,
  activateBt,
  initJobData,
  saveUserData,
  getCardData,
} from "./../components/ui";
import {
  initShowImage,
  initClose,
  openPopup,
  initSubmit,
  resetForm,
} from "./../components/modal";
import {
  uiOpt,
  modImageShowOpt,
  modUserProfOpt,
  modAddPlaceOpt,
  cardsOpt,
  initialCards,
  userData,
} from "./../components/options";

//  ----------------------------------
// Основной код

const uiCtrl = getObj(uiOpt);
// console.log(uiControls);
const modImage = getObj(modImageShowOpt);
// console.log(modImage);
const modUserProf = getObj(modUserProfOpt);
// console.log(modUserProf);
const modAddPlace = getObj(modAddPlaceOpt);
// console.log(modAddPlace);
const cardObg = getObj(cardsOpt);
// console.log(cardObg);

renderCards(initialCards, cardObg, onShow);
renderUserProfile(userData, uiCtrl);
activateBt(uiCtrl.uiEditButton, onEdit, modUserProf);
activateBt(uiCtrl.uiAddCardButton, onAddCard, modAddPlace);

function onShow(name, url) {
  initShowImage(name, url, modImage);
  initClose(modImage.window);
  openPopup(modImage.window);
  // console.log(name, url);
}

function onEdit(modUserProf) {
  initJobData(modUserProf, userData);
  initClose(modUserProf.window, modUserProf.form);
  initSubmit(modUserProf, onUserSaveprof);
  enableValidate(modUserProf);
  openPopup(modUserProf.window);
}

function onUserSaveprof(modUserProf) {
  const data = getDataForm(modUserProf, modUserProfOpt);
  saveUserData(data, userData);
  renderUserProfile(userData, uiCtrl);
}

function onAddCard(modAddPlace) {
  resetForm(modAddPlace.form);
  initClose(modAddPlace.window, modAddPlace.form);
  initSubmit(modAddPlace, onSaveCard);
  openPopup(modAddPlace.window);
  // console.log("Нажата кнопка добавить");
}

function onSaveCard() {
  const data = [getDataForm(modAddPlace, modAddPlaceOpt)];
  renderCards(data, cardObg, onShow);
}
