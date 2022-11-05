//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { api } from "./../components/api";
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
  validationOpt,
} from "./../components/options";

//  ----------------------------------
// Основной код

const uiCtrl = getObj(uiOpt);
const modImage = getObj(modImageShowOpt);
const modUserProf = getObj(modUserProfOpt);
const modAddPlace = getObj(modAddPlaceOpt);
const cardObg = getObj(cardsOpt);

// console.log(api.getServerData());

Promise.all([api.getServerData(api.profile), api.getServerData(api.cards)])
  .then(([remoteProfile, cards]) => {
    // console.log(remoteProfile, cards);
    renderUserProfile(remoteProfile, uiCtrl);
    renderCards(cards, cardObg, remoteProfile);
  })
  .catch((errData) => {
    console.log(errData);
  });

//
// api.getServerData(renderUserProfile, uiCtrl);

activateBt(uiCtrl.uiEditButton, onEdit, modUserProf);
activateBt(uiCtrl.uiAddCardButton, onAddCard, modAddPlace);
enableValidate(validationOpt, modUserProf, modAddPlace);

function onLikeCard(id) {
  // const id = evt.target.closest.querySelector(".elements__item");
  console.log(`Попытка лайка ${id}`);
  // TODO доделать отправку запроса на сервер
}

function onDeleteCard() {
  console.log("Попытка удаления");
}

function renderCards(arrCards, cardObg, remoteProfile) {
  for (let data of arrCards) {
    insertCard(
      getCard(data, cardObg, remoteProfile, {
        onLikeCard,
        onDeleteCard,
        onShow,
      }),
      cardObg
    );
  }
}

function onShow(name, url) {
  getDataImage(name, url, modImage);
  initShow(modImage, { type: "simple" });
}

function onEdit(modUserProf) {
  // debugger;
  initJobData(uiCtrl, modUserProf);
  initShow(modUserProf, { type: "form", cb: onSaveProfile, reset: false });
}

function onSaveProfile(modUserProf) {
  // saveUserData(getDataForm(modUserProf, modUserProfOpt), userData);

  console.log(getDataForm(modUserProf, modUserProfOpt));
  // debugger;
  // renderUserProfile(userData, uiCtrl);
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
