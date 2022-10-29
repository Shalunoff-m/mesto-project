// Импорт CSS
import "./index.css";

// Импорт модулей JS
// debugger;
import { initialCards } from "./../components/objects.js";
import {
  createCards,
  insertAtStart,
  insertAtEnd,
} from "./../components/card.js";

createCards(initialCards, insertAtStart);
//Основной стек

userFormElements.btKustoEditProfile.addEventListener("click", () => {
  showPopupEditProfile(userFormElements);
});

function exportDataToPage(job, name) {
  userFormElements.labelName.textContent = name;
  userFormElements.labeljob.textContent = job;
}
