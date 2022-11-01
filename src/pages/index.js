//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { initialCards, createCards } from "./../components/card";
import { initUIEvent, $uiOpt } from "./../components/ui";
import { initModal } from "./../components/modal";
import { getObj } from "./../components/utils";

//  ----------------------------------
// Основной код

createCards(initialCards);
initUIEvent();
initModal();
// debugger;
const uiControls = getObj($uiOpt);
console.log(uiControls);
