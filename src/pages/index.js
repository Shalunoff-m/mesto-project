//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { getObj } from "./../components/utils";
import { renderCards } from "./../components/card";
import {} from "./../components/ui";
import {
  initShowImage,
  initClose,
  openPopup,
  closePopup,
} from "./../components/modal";
import {
  uiOpt,
  modImageShowOpt,
  modUserProfOpt,
  modAddPlaceOpt,
  cardsOpt,
  initialCards,
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

function onShow(name, url) {
  initShowImage(name, url, modImage);
  initClose(modImage.window);
  openPopup(modImage.window);
  // console.log(name, url);
}
