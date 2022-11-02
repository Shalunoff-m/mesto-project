// TODO Нужно написать еще функцию простановки опций карты и передать их в создание карточки

export function renderCards(arrCards, uiData, onShow) {
  for (let data of arrCards) {
    const $newCard = getCard(data, uiData, tgLike, deleteCard);
    uiData.container.prepend($newCard);
  }

  function getCard(data, uiData, cbLike, cbDelete) {
    const template = uiData.template.content;
    // Клонируем элементы шаблона
    const $newCard = template.cloneNode(true);
    const $cardElement = $newCard.querySelector(".elements__item");
    const $Name = $newCard.querySelector(".elements__caption");
    const $Image = $newCard.querySelector(".elements__image");
    const $like = $newCard.querySelector(".elements__like-button");
    const $delete = $newCard.querySelector(".elements__delete-button");

    // Назначаем параметры
    $Name.textContent = data.name;
    $Image.setAttribute("src", data.link);
    $Image.setAttribute("alt", data.name);

    $cardElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("elements__like-button")) {
        cbLike($like);
      }
      if (evt.target.classList.contains("elements__delete-button")) {
        cbDelete(evt);
      }
      if (evt.target.classList.contains("elements__image")) {
        // console.log(evt.target);
        const $card = evt.target.closest(".elements__item");
        const name = $card.querySelector(".elements__caption").textContent;
        const url = $card.querySelector(".elements__image").getAttribute("src");
        onShow(name, url);
      }
    });

    return $newCard;
  }
}

function tgLike(Bt) {
  Bt.classList.toggle("elements__like-button_active");
}

function deleteCard(evt) {
  // console.log(evt);
  evt.target.closest(".elements__item").remove();
  // $deletecardli;
}
