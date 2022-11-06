import { api } from "./api";

export function insertCard(card, cardObj, opt) {
  if (opt.to === "start") {
    cardObj.container.prepend(card);
  }
  if (opt.to === "end") {
    cardObj.container.append(card);
  }
}

export function getCard(data, cardObg, userId, cbCard) {
  const template = cardObg.template.content;
  // Клонируем элементы шаблона
  const $newCard = template.cloneNode(true);
  const $cardElement = $newCard.querySelector(".elements__item");
  const $name = $newCard.querySelector(".elements__caption");
  const $image = $newCard.querySelector(".elements__image");
  const $like = $newCard.querySelector(".elements__like-button");
  const $counter = $newCard.querySelector(".elements__like-counter");
  const $delete = $newCard.querySelector(".elements__delete-button");

  $name.textContent = data.name;
  $image.setAttribute("src", data.link);
  $image.setAttribute("alt", data.name);
  $cardElement.id = data._id;
  $counter.textContent = data.likes.length;

  $like.addEventListener("click", (evt) => {
    if (isActive($like)) {
      onLikeCard($cardElement, $like, { act: "dislike" });
    } else {
      onLikeCard($cardElement, $like, { act: "like" });
    }
  });
  $delete.addEventListener("click", (evt) => {
    onDeleteCard($cardElement);
  });
  $image.addEventListener("click", () => {
    cbCard.onShow(data.name, data.link);
  });

  if (checkLike(data, userId)) {
    toggleLike($like);
  }
  if (!checkOwner(data, userId)) {
    $delete.remove();
  }
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

function checkLike(data, userId) {
  const { likes } = data;
  const answer = likes.some((like) => {
    return like._id === userId;
  });
  return answer;
}

function checkOwner(data, userId) {
  const { owner } = data;
  return owner._id === userId;
}

export function toggleLike(button) {
  button.classList.toggle("elements__like-button_active");
}

export function deleteCard($card) {
  $card.remove();
}

// BM JS/ Лайк карточки
function onLikeCard(card, likeButton, opt) {
  // запрос на удаление
  if (opt.act === "dislike") {
    api
      .removeLike(card.id)
      .then((res) => {
        setCounter(res, card);
        toggleLike(likeButton);
      })
      .catch((errData) => {
        console.log(errData);
      });
  } else {
    // запрос на установку
    api
      .addLike(card.id)
      .then((res) => {
        setCounter(res, card);
        toggleLike(likeButton);
      })
      .catch((errData) => {
        console.log(errData);
      });
  }
}

// BM JS/ Удаление карточки
function onDeleteCard(card) {
  api
    .deleteCard(card.id)
    .then(() => {
      deleteCard(card);
    })
    .catch((errData) => {
      console.log(errData);
    });
}
