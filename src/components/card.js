// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНОВ КАРТОЧЕК
const $cardContainer = document.querySelector(".elements__list");
const $templateCard = document.querySelector("#card").content;

export function createCards(arrayCards, addmethod) {
  arrayCards.forEach(addmethod);
}

export function insertAtStart(cardItem) {
  $cardContainer.prepend(addCardListeners(getCard(cardItem)));
}
export function insertAtEnd(cardItem) {
  $cardContainer.append(addCardListeners(getCard(cardItem)));
}

function addCardListeners($card) {
  const $cardElementList = $card.querySelector(".elements__item");

  $cardElementList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("elements__like-button")) {
      evt.target.classList.toggle("elements__like-button_active");
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__delete-button")) {
      // console.log(evt.target);
      $cardElementList.remove();
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__image")) {
      showPopupImage(evt);
      evt.stopPropagation();
    }
    console.log(evt.target);
  });
  return $card;
}

// Функция создания карточки
function getCard(cardItem) {
  // Клонируем элементы шаблона
  const $newCard = $templateCard.cloneNode(true);

  const $cardName = $newCard.querySelector(".elements__caption");
  const $cardImage = $newCard.querySelector(".elements__image");
  const $cardLike = $newCard.querySelector(".elements__like-button");
  // Назначаем параметры
  $cardName.textContent = cardItem.name;
  $cardImage.setAttribute("src", cardItem.link);
  $cardImage.setAttribute("alt", cardItem.name);

  return $newCard;
}
