/* export function renderCards(arrCards, profileData, onShow) {
  for (let data of arrCards) {
    const $newCard = getCard(data, profileData, toggleLike, deleteCard, onShow);
    profileData.container.prepend($newCard);
  }
} */

export function insertCard(card, cardObj, opt) {
  if (opt.to === "start") {
    cardObj.container.prepend(card);
  }
  if (opt.to === "end") {
    cardObj.container.append(card);
  }
}

export function getCard(data, cardObg, remoteProfile, cbCard) {
  const template = cardObg.template.content;
  // Клонируем элементы шаблона
  const $newCard = template.cloneNode(true);
  const $cardElement = $newCard.querySelector(".elements__item");
  const $Name = $newCard.querySelector(".elements__caption");
  const $Image = $newCard.querySelector(".elements__image");
  const $like = $newCard.querySelector(".elements__like-button");
  const $counter = $newCard.querySelector(".elements__like-counter");
  const $delete = $newCard.querySelector(".elements__delete-button");

  $Name.textContent = data.name;
  $Image.setAttribute("src", data.link);
  $Image.setAttribute("alt", data.name);
  $cardElement.id = data._id;
  $counter.textContent = data.likes.length;

  $like.addEventListener("click", (evt) => {
    // cbLike($like);
    // debugger;
    if (isActive($like)) {
      cbCard.onLikeCard($cardElement, $like, { act: "dislike" });
    } else {
      cbCard.onLikeCard($cardElement, $like, { act: "like" });
    }

    // toggleLike($like);
  });
  $delete.addEventListener("click", (evt) => {
    // cbDelete(evt, $cardElement);
    cbCard.onDeleteCard($cardElement);
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

function isActive(likeButton) {
  if (likeButton.classList.contains("elements__like-button_active")) {
    return true;
  }
  return false;
}

export function setCounter(res, card) {
  const count = card.querySelector(".elements__like-counter");
  count.textContent = res.likes.length;
}

function checkLike(data, remoteProfile) {
  const { _id } = remoteProfile;
  const { likes } = data;
  let answer = likes.some((like) => {
    return like._id === _id;
  });
  return answer;
}

function checkOwner(data, remoteProfile) {
  const { _id } = remoteProfile;
  const { owner } = data;
  return owner._id === _id;
}

export function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

export function deleteCard($card) {
  $card.remove();
}
