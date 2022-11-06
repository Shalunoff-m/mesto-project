//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { api } from "./../components/api";
import { getObj, getDataForm } from "./../components/utils";
import { enableValidate } from "./../components/validate";
import {
  getCard,
  insertCard,
  deleteCard,
  toggleLike,
  setCounter,
} from "./../components/card";
import {
  renderUserProfile,
  activateBt,
  initJobData,
  initAvatarData,
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
  modAvatarOpt,
} from "./../components/options";

//  ----------------------------------
// Основной код

const uiCtrl = getObj(uiOpt);
const modImage = getObj(modImageShowOpt);
const modUserProf = getObj(modUserProfOpt);
const modAddPlace = getObj(modAddPlaceOpt);
const modAvatar = getObj(modAvatarOpt);
const cardObg = getObj(cardsOpt);

console.log(modAvatar);

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
// TODO Здесь нужно написать колбек инициализ окно аватарки и передать его, а в него передать ссылку на нынешний аватар
/* Короче модалка есть, нужно написать обработчик на переброс активной ссылки, после чего написать АПИ запрос на обновление фото на сервере, и из ответа прорендерить новое фото на страницу */
activateBt(uiCtrl.uiEditAvatarButton, onChangeAvatar, modAvatar);
enableValidate(validationOpt, modUserProf, modAddPlace, modAvatar);

// BM js/ создание карточек
function renderCards(arrCards, cardObg, remoteProfile) {
  for (let data of arrCards) {
    insertCard(
      getCard(data, cardObg, remoteProfile, {
        onLikeCard,
        onDeleteCard,
        onShow,
      }),
      cardObg,
      { to: "end" }
    );
  }
}

// BM js/ открытие модалки аватара
function onChangeAvatar() {
  initAvatarData(uiCtrl, modAvatar);
  initShow(modAvatar, {
    type: "form",
    cb: onSaveAvatar,
    reset: false,
  });
}

// BM js/ сохранение аватара профиля
function onSaveAvatar() {
  const avaData = getDataForm(modAvatar, modAvatarOpt);
  // console.log(avaData);
  api.saveAvatar(avaData).then((answer) => {
    // console.log(answer);

    renderUserProfile(answer, uiCtrl);
  });
}

// BM js/ просмотр изображений
function onShow(name, url) {
  getDataImage(name, url, modImage);
  initShow(modImage, { type: "simple" });
}

// BM js/ редактирование профиля
function onEdit(modUserProf) {
  // debugger;
  initJobData(uiCtrl, modUserProf);
  initShow(modUserProf, {
    type: "form",
    cb: onSaveProfile,
    reset: false,
  });
}

// BM JS/ Сохранение профиля
function onSaveProfile(modUserProf) {
  // saveUserData(getDataForm(modUserProf, modUserProfOpt), userData);
  const dataForm = getDataForm(modUserProf, modUserProfOpt);
  api.saveUserProfile(dataForm).then((newRemoteUserData) => {
    console.log(newRemoteUserData);
    renderUserProfile(newRemoteUserData, uiCtrl);
  });

  // debugger;
  // renderUserProfile(userData, uiCtrl);
}

// BM JS/ Лайк карточки
function onLikeCard(card, likeButton, opt) {
  // const id = evt.target.closest.querySelector(".elements__item");

  if (opt.act === "dislike") {
    api.removeLike(card.id).then((res) => {
      setCounter(res, card);
      toggleLike(likeButton);
    });
    // запрос на удаление
  } else {
    // запрос на установку
    api.addLike(card.id).then((res) => {
      setCounter(res, card);
      toggleLike(likeButton);
    });
  }
}
// TODO Не хватает одного окна подтверждения удаления
// BM JS/ Удаление карточки
function onDeleteCard(card) {
  console.log("Попытка удаления");
  api.deleteCard(card.id).then(() => {
    deleteCard(card);
  });
}

// BM JS/ Открытие модалки сохраниения карточки
function onAddCard(modAddPlace) {
  initShow(modAddPlace, { type: "form", cb: onSaveCard, reset: true });
}

// BM JS/Сохранение карточки
function onSaveCard() {
  Promise.all([
    api.getServerData(api.profile),
    api.saveNewCard(getDataForm(modAddPlace, modAddPlaceOpt)),
  ]).then(([remoteProfile, newCard]) => {
    insertCard(
      getCard(newCard, cardObg, remoteProfile, {
        onLikeCard,
        onDeleteCard,
        onShow,
      }),
      cardObg,
      { to: "start" }
    );
  });
}
