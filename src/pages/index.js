//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { getObj, getDataForm } from "./../components/utils";
import { enableValidate } from "./../components/validate";
import { renderCards, getCardData } from "./../components/card";
import {
  renderUserProfile,
  activateBt,
  initJobData,
  saveUserData,
} from "../components/profile";
import {
  initShowImage,
  initShow,
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
enableValidate(modUserProf, modAddPlace);

function onShow(name, url) {
  initShowImage(name, url, modImage);
  initShow(modImage);
}

function onEdit(modUserProf) {
  initJobData(modUserProf, userData);
  initShow(modUserProf, onSaveProfile);
  // initSubmit(modUserProf, onSaveProfile);
  // openPopup(modUserProf.window);
}

function onSaveProfile(modUserProf) {
  saveUserData(getDataForm(modUserProf, modUserProfOpt), userData);
  renderUserProfile(userData, uiCtrl);
}

function onAddCard(modAddPlace) {
  //
  resetForm(modAddPlace.form);
  initShow(modAddPlace, onSaveCard);
  // initSubmit(modAddPlace, onSaveCard);
  // openPopup(modAddPlace.window);
  // console.log("Нажата кнопка добавить");
}

function onSaveCard() {
  const data = [getDataForm(modAddPlace, modAddPlaceOpt)];
  renderCards(data, cardObg, onShow);
}
