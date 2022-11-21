//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей

import { api } from "./../components/api";
import { getObj } from "./../components/utils";
import { enableValidate } from "./../components/validate";
import { getCard, insertCard, apiAddCard } from "./../components/card";
import {
  renderUserProfile,
  activateBt,
  initJobData,
  initAvatarData,
  apiSaveAvatar,
  apiSaveProfile,
} from "../components/profile";
import { getDataImage, activateModal, openPopup } from "./../components/modal";
import {
  uiOpt,
  modImageShowOpt,
  modUserProfOpt,
  modAddPlaceOpt,
  cardsOpt,
  validationOpt,
  modAvatarOpt,
  submitOpt,
} from "./../components/options";

//  ----------------------------------
// Основной код

const uiCtrl = getObj(uiOpt);
const modImage = getObj(modImageShowOpt);
const modUserProf = getObj(modUserProfOpt);
const modAddPlace = getObj(modAddPlaceOpt);
const modAvatar = getObj(modAvatarOpt);
const cardObg = getObj(cardsOpt);
let userId = "";

activateModal(onFormAction);

Promise.all([api.getServerData(api.profile), api.getServerData(api.cards)])
  .then(([remoteProfile, cards]) => {
    userId = remoteProfile._id;
    renderUserProfile(remoteProfile, uiCtrl);
    renderCards(cards, cardObg, userId);
  })
  .catch((errData) => {
    console.log(errData);
  })
  .finally(() => {});

activateBt(uiCtrl.uiEditButton, onEdit, modUserProf);
activateBt(uiCtrl.uiAddCardButton, onAddCard, modAddPlace);
activateBt(uiCtrl.uiEditAvatarButton, onChangeAvatar, modAvatar);
enableValidate(validationOpt);

// BM js/ глобальный обработчик форм
function onFormAction(evt) {
  switch (evt.target.id) {
    // BM JS/Сохранение карточки
    case submitOpt.onAddNewCard: {
      apiAddCard({
        evt: evt,
        popup: modAddPlace,
        settings: modAddPlaceOpt,
        cardData: cardObg,
        id: userId,
        cb: onShow,
      });
      break;
    }
    // BM JS/ Сохранение профиля
    case submitOpt.onChangeProfile: {
      apiSaveProfile({
        evt: evt,
        popup: modUserProf,
        settings: modUserProfOpt,
        ui: uiCtrl,
      });

      break;
    }
    // BM js/ сохранение аватара профиля
    case submitOpt.onChangeAvatar: {
      // функция запроса изменения в профиль
      apiSaveAvatar({
        evt: evt,
        popup: modAvatar,
        settings: modAvatarOpt,
        ui: uiCtrl,
      });
      break;
    }
  }
}

// BM js/ глобальная функция создание карточек
function renderCards(arrCards, cardObg, userId) {
  for (let data of arrCards) {
    insertCard(getCard(data, cardObg, userId, onShow), cardObg, { to: "end" });
  }
}

// BM js/ открытие модалки аватара
function onChangeAvatar() {
  initAvatarData(uiCtrl, modAvatar);
  openPopup(modAvatar.modal, { modal: modAvatar, reset: false });
}

// BM js/ просмотр изображений
function onShow(name, url) {
  getDataImage(name, url, modImage);
  openPopup(modImage.modal, { modal: modImage, reset: false });
}

// BM js/ редактирование профиля
function onEdit() {
  initJobData(uiCtrl, modUserProf);
  openPopup(modUserProf.modal, { modal: modUserProf, reset: false });
}

// BM JS/ Открытие модалки сохранения карточки
function onAddCard(modAddPlace) {
  openPopup(modAddPlace.modal, { modal: modAddPlace, reset: true });
}

function test() {
  console.log("Hello");
}
