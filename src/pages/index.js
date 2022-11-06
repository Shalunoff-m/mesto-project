//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { api } from "./../components/api";
import {
  getObj,
  getDataForm,
  hideLoading,
  showLoading,
  getButtonText,
  setButtonText,
} from "./../components/utils";
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
import {
  getDataImage,
  initShow,
  activateModal,
  closePopup,
  openPopup,
} from "./../components/modal";
import {
  uiOpt,
  modImageShowOpt,
  modUserProfOpt,
  modAddPlaceOpt,
  cardsOpt,
  validationOpt,
  modAvatarOpt,
  loadingOpt,
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
const loadTarget = getObj(loadingOpt);
let userId = "";
showLoading(loadTarget);

activateModal(onFormAction);

// BM js/ глобальный обработчик форм
function onFormAction(evt) {
  switch (evt.target.id) {
    // BM JS/Сохранение карточки
    case submitOpt.onAddNewCard: {
      let buttonText = getButtonText(modAddPlace.savebutton);
      setButtonText("Сохранение...", modAddPlace.savebutton);
      api
        .saveNewCard(getDataForm(modAddPlace, modAddPlaceOpt))
        .then((newCard) => {
          insertCard(
            getCard(newCard, cardObg, userId, {
              onLikeCard,
              onDeleteCard,
              onShow,
            }),
            cardObg,
            { to: "start" }
          );
          closePopup(modAddPlace.modal, evt);
        })
        .catch((errData) => {
          console.log(errData);
        })
        .finally(() => {
          setButtonText(buttonText, modAddPlace.savebutton);
        });

      break;
    }
    // BM JS/ Сохранение профиля
    case submitOpt.onChangeProfile: {
      let buttonText = getButtonText(modUserProf.savebutton);
      setButtonText("Сохранение...", modUserProf.savebutton);
      const dataForm = getDataForm(modUserProf, modUserProfOpt);
      api
        .saveUserProfile(dataForm)
        .then((newRemoteUserData) => {
          renderUserProfile(newRemoteUserData, uiCtrl);
          closePopup(modUserProf.modal, evt);
        })
        .catch((errData) => {
          console.log(errData);
        })
        .finally(() => {
          setButtonText(buttonText, modUserProf.savebutton);
        });

      break;
    }
    // BM js/ сохранение аватара профиля
    case submitOpt.onChangeAvatar: {
      let buttonText = getButtonText(modAvatar.savebutton);
      setButtonText("Сохранение...", modAvatar.savebutton);

      const avaData = getDataForm(modAvatar, modAvatarOpt);
      api
        .saveAvatar(avaData)
        .then((answer) => {
          renderUserProfile(answer, uiCtrl);
          closePopup(modAvatar.modal, evt);
        })
        .catch((errData) => {
          console.log(errData);
        })
        .finally(() => {
          setButtonText(buttonText, modAvatar.savebutton);
        });
      console.log("Смена Авы");
      break;
    }
  }
}

Promise.all([api.getServerData(api.profile), api.getServerData(api.cards)])
  .then(([remoteProfile, cards]) => {
    userId = remoteProfile._id;
    renderUserProfile(remoteProfile, uiCtrl);
    renderCards(cards, cardObg, userId);
  })
  .catch((errData) => {
    console.log(errData);
  })
  .finally(() => {
    hideLoading(loadTarget);
  });

activateBt(uiCtrl.uiEditButton, onEdit, modUserProf);
activateBt(uiCtrl.uiAddCardButton, onAddCard, modAddPlace);
activateBt(uiCtrl.uiEditAvatarButton, onChangeAvatar, modAvatar);
enableValidate(validationOpt, modUserProf, modAddPlace, modAvatar);

// BM js/ глобальная функция создание карточек
function renderCards(arrCards, cardObg, userId) {
  for (let data of arrCards) {
    insertCard(
      getCard(data, cardObg, userId, {
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
  openPopup(modAvatar.modal, { modal: modAvatar, reset: false });
}

// BM js/ просмотр изображений
function onShow(name, url) {
  getDataImage(name, url, modImage);
  openPopup(modImage.modal, { modal: modImage, reset: false });
}

// BM js/ редактирование профиля
function onEdit(modUserProf) {
  initJobData(uiCtrl, modUserProf);
  openPopup(modUserProf.modal, { modal: modUserProf, reset: false });
}

// BM JS/ Лайк карточки
function onLikeCard(card, likeButton, opt) {
  // запрос на удаление
  if (opt.act === "dislike") {
    api
      .removeLike(card.id)
      .then((res) => {
        setCounter(res, card);
        toggleLike(likeButton);
      })
      .catch((errData) => {
        console.log(errData);
      });
  } else {
    // запрос на установку
    api
      .addLike(card.id)
      .then((res) => {
        setCounter(res, card);
        toggleLike(likeButton);
      })
      .catch((errData) => {
        console.log(errData);
      });
  }
}

// BM JS/ Удаление карточки
function onDeleteCard(card) {
  api
    .deleteCard(card.id)
    .then(() => {
      deleteCard(card);
    })
    .catch((errData) => {
      console.log(errData);
    });
}

// BM JS/ Открытие модалки сохранения карточки
function onAddCard(modAddPlace) {
  openPopup(modAddPlace.modal, { modal: modAddPlace, reset: true });
}
