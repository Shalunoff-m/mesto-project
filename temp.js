function addCardListeners($card) {
  const $cardElementList = $card.querySelector(".elements__item");

  $cardElementList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("elements__like-button")) {
      evt.target.classList.toggle("elements__like-button_active");
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__delete-button")) {
      $cardElementList.remove();
      evt.stopPropagation();
    }
    if (evt.target.classList.contains("elements__image")) {
      debugger;
      const imageClick = evt.target.closest(".elements__item");
      ppShow.popupTextImage =
        imageClick.querySelector(".elements__caption").textContent;
      ppShow.popupImage = imageClick
        .querySelector(".elements__image")
        .getAttribute("src");
      openPopup(ppShow.popupWindow);
      evt.stopPropagation();
    }
  });
  return $card;
}
