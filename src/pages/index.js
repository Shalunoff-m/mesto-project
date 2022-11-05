//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { getObj, getDataForm } from "./../components/utils";
import { enableValidate } from "./../components/validate";
import { getCard, insertCard } from "./../components/card";
import {
  renderUserProfile,
  activateBt,
  initJobData,
  saveUserData,
} from "../components/profile";
import { getDataImage, initShow } from "./../components/modal";
import {
  uiOpt,
  modImageShowOpt,
  modUserProfOpt,
  modAddPlaceOpt,
  cardsOpt,
  initialCards,
  userData,
  validationOpt,
} from "./../components/options";

//  ----------------------------------
// Основной код

const uiCtrl = getObj(uiOpt);
const modImage = getObj(modImageShowOpt);
const modUserProf = getObj(modUserProfOpt);
const modAddPlace = getObj(modAddPlaceOpt);
const cardObg = getObj(cardsOpt);

renderCards(initialCards, cardObg);
renderUserProfile(userData, uiCtrl);
activateBt(uiCtrl.uiEditButton, onEdit, modUserProf);
activateBt(uiCtrl.uiAddCardButton, onAddCard, modAddPlace);
enableValidate(validationOpt, modUserProf, modAddPlace);

function renderCards(arrCards, cardObg) {
  for (let data of arrCards) {
    insertCard(getCard(data, cardObg, onShow), cardObg);
  }
}

function onShow(name, url) {
  getDataImage(name, url, modImage);
  initShow(modImage, { type: "simple" });
}

function onEdit(modUserProf) {
  initJobData(modUserProf, userData);
  initShow(modUserProf, { type: "form", cb: onSaveProfile, reset: false });
}

function onSaveProfile(modUserProf) {
  saveUserData(getDataForm(modUserProf, modUserProfOpt), userData);
  renderUserProfile(userData, uiCtrl);
}

function onAddCard(modAddPlace) {
  initShow(modAddPlace, { type: "form", cb: onSaveCard, reset: true });
}

function onSaveCard() {
  insertCard(
    getCard(getDataForm(modAddPlace, modAddPlaceOpt), cardObg, onShow),
    cardObg
  );
}
