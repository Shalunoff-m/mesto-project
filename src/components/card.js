export function renderCards(arrCards, profileData, onShow) {
  for (let data of arrCards) {
    const $newCard = getCard(data, profileData, tgLike, deleteCard, onShow);
    profileData.container.prepend($newCard);
  }
}

function getCard(data, profileData, cbLike, cbDelete, onShow) {
  const template = profileData.template.content;
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

  $like.addEventListener("click", () => {
    cbLike($like);
  });
  $delete.addEventListener("click", (evt) => {
    cbDelete(evt, $cardElement);
  });
  $Image.addEventListener("click", () => {
    const name = $Name.textContent;
    const url = $Image.getAttribute("src");
    onShow(name, url);
  });

  return $newCard;
}

export function getCardData(modAddPlace) {
  const data = {
    name: modAddPlace.name.value,
    link: modAddPlace.link.value,
  };
  return [data];
}

function tgLike(button) {
  button.classList.toggle("elements__like-button_active");
}

function deleteCard(evt, $card) {
  $card.remove();
}
