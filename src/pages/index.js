//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей

import { initialCards, createCards } from "./../components/card";
import { initUIEvent } from "./../components/ui";
import { initModal } from "./../components/modal";

//  ----------------------------------
// Основной код

createCards(initialCards);
initUIEvent();
initModal();
