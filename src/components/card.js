/* export function renderCards(arrCards, profileData, onShow) {
  for (let data of arrCards) {
    const $newCard = getCard(data, profileData, toggleLike, deleteCard, onShow);
    profileData.container.prepend($newCard);
  }
} */

export function insertCard(card, cardObj) {
  cardObj.container.prepend(card);
}

export function getCard(data, cardObg, remoteProfile, cbCard) {
  // console.log(data);
  // console.log(remoteProfile);
  const template = cardObg.template.content;
  // Клонируем элементы шаблона
  const $newCard = template.cloneNode(true);
  const $cardElement = $newCard.querySelector(".elements__item");
  const $Name = $newCard.querySelector(".elements__caption");
  const $Image = $newCard.querySelector(".elements__image");
  const $like = $newCard.querySelector(".elements__like-button");
  const $delete = $newCard.querySelector(".elements__delete-button");

  $Name.textContent = data.name;
  $Image.setAttribute("src", data.link);
  $Image.setAttribute("alt", data.name);
  $cardElement.id = data._id;

  $like.addEventListener("click", (evt) => {
    // cbLike($like);
    cbCard.onLikeCard($cardElement.id);
    // toggleLike($like);
  });
  $delete.addEventListener("click", (evt) => {
    // cbDelete(evt, $cardElement);
    cbCard.onDeleteCard();
    // deleteCard(evt, $cardElement);
  });
  $Image.addEventListener("click", () => {
    const name = $Name.textContent;
    const url = $Image.getAttribute("src");
    cbCard.onShow(name, url);
  });

  if (checkLike(data, remoteProfile)) {
    toggleLike($like);
  }
  if (!checkOwner(data, remoteProfile)) {
    $delete.remove();
  }

  // Назначаем параметры изображения

  return $newCard;
}

function checkLike(data, remoteProfile) {
  // const { _id } = remoteProfile;
  // HACK Здесь подставлен чужой id для проверки
  const _id = "ceab3c71e9e6563c74cf0b8f";
  const { likes } = data;
  let answer = likes.some((like) => {
    return like._id === _id;
  });
  return answer;
}

function checkOwner(data, remoteProfile) {
  // const { _id } = remoteProfile;
  // HACK Здесь подставлен чужой id для проверки
  const _id = "ceab3c71e9e6563c74cf0b8f";
  const { owner } = data;
  // console.log(owner._id === _id);
  return owner._id === _id;
}

export function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

export function deleteCard(evt, $card) {
  $card.remove();
}
