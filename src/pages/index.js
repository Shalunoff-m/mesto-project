//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import { Api } from "./../components/api";
import { Popup } from "../components/popup";
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
const popupAvatar = new Popup("#popup-avatar");
const popupNewPlace = new Popup("#popup-new-place");
popupAvatar.show();

// Запрос параметров соединения с сервером
api.getInfo();
document
  .querySelector(".profile__add-button")
  .addEventListener("click", (evt) => {
    popupNewPlace.open();
  });
