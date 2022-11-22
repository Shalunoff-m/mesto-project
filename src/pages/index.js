//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import { Api } from "./../components/api";
//  ----------------------------------
// Основной код

// BM js/ Основной js код
const api = new Api();
api
  .getCards()
  .then((data) => {
    api.showData(data);
  })
  .catch((errData) => {
    api.showData(errData);
  });
