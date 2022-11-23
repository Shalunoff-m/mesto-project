//  ----------------------------------
// импорт стилей CSS
import "./index.css";
//  ----------------------------------
// импорт js модулей
// BM js/ глобальное подключение модулей
import { Api } from "./../components/api";
import { Card } from "./../components/card";
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
api.getInfo();

//Создание новой карточки (привяжем к Section)
const insertCard = (data) => {
    const card = new Card({
        data: data,
        cardSelector: '#card',
        userId: userId,
        handleCardClick: (name,link) => {
            //здесь функция обработчик на окрытие попапа
        },
        onDeleteCard: (id) => {

        },
        setLike: (id) => {
            api.addLike(id)
                .then((data)=>{
                    card.handleCardLike(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        removeLike: (id) => {
            api.removeLike(id)
                .then((data) => {
                    card.handleCardLike(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }

    })
    const cardElement = card.getCard();
    return cardElement;
};