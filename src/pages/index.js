//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import { Api } from "./../components/api";
import { Popup, PopupWithImage, PopupWithForm } from "../components/popup";
//  ----------------------------------
// Основной код

// BM js/ Основной js код

// Проверка перенастройки сервера
// Api.setParametr({
//   token: "269e9438-b227-400f-84a0-3e13cb6c82c577777",
//   group: "plus-cohort-20",
//   address: "https://nomorepartiesawdawd.co",
// });

// Создаем инстанс для работы с апи
const api = new Api();

// Запрос параметров соединения с сервером
// api.getInfo();

// Проверка на просмотр карточки
const popupImage = new PopupWithImage("#view-image");
/* document
  .querySelector(".profile__add-button")
  .addEventListener("click", (evt) => {
    // popupNewPlace.open();
    popupImage.open({
      src: "https://images.unsplash.com/photo-1669023030485-573b6a75ab64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
      text: "Какой-то дом",
    });
  }); */

const popupNewPlace = new PopupWithForm("#popup-new-place", {
  formName: "popupNewPlace",
  handler: (data) => {
    console.log(data);
  },
});
popupNewPlace.setEventListeners();

document
  .querySelector(".profile__add-button")
  .addEventListener("click", (evt) => {
    popupNewPlace.open();
  });

// Проверка модалки формы
