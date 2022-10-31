// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНОВ КАРТОЧЕК
const $cardContainer = document.querySelector(".elements__list");
const $templateCard = document.querySelector("#card").content;

// Начальный массив карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCards(arr) {
  arr.forEach(prependCard);
  function prependCard(cardItem) {
    const $carditem = getCard(cardItem);
    $cardContainer.prepend($carditem);
  }

  function getCard(cardItem) {
    // Клонируем элементы шаблона
    const $newCard = $templateCard.cloneNode(true);
    const $cardName = $newCard.querySelector(".elements__caption");
    const $cardImage = $newCard.querySelector(".elements__image");
    // Назначаем параметры
    $cardName.textContent = cardItem.name;
    $cardImage.setAttribute("src", cardItem.link);
    $cardImage.setAttribute("alt", cardItem.name);
    return $newCard;
  }
}
