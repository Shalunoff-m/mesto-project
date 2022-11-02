// Нужно написать еще функцию простановки опций карты и передать их в создание карточки

export function renderCards(arrCards, uiData) {
  for (let data of arrCards) {
    const $newCard = getCard(data, uiData);
    uiData.container.prepend($newCard);
  }

  function getCard(data, uiData) {
    const template = uiData.template.content;
    // Клонируем элементы шаблона
    const $newCard = template.cloneNode(true);
    const $Name = $newCard.querySelector(".elements__caption");
    const $Image = $newCard.querySelector(".elements__image");
    const $like = $newCard.querySelector(".elements__like-button");
    const $delete = $newCard.querySelector(".elements__delete-button");

    // Назначаем параметры
    $Name.textContent = data.name;
    $Image.setAttribute("src", data.link);
    $Image.setAttribute("alt", data.name);
    return $newCard;
  }
}
