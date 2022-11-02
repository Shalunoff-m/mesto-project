export function showImageModal({ evt, modImage }) {
  // console.log(evt);
  console.log(modImage);
  const imageClick = evt.target.closest(".elements__item");
  const cardName = imageClick.querySelector(".elements__caption").textContent;
  const cardUrl = imageClick
    .querySelector(".elements__image")
    .getAttribute("src");

  console.log(imageClick, cardName, cardUrl);

  // modImage.image.setAttribute("src", cardUrl);
  // modImage.image.setAttribute("alt", cardName);
  modImage.Description.textContent = cardName;
  // const { window } = modImage;
  openPopup(window);
}

export function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  // popupWindow.addEventListener("click", closePopup);
}

function closePopup(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") ||
    evt.type === "submit"
  ) {
    const popupWindow = evt.target.closest(".popup");
    popupWindow.classList.remove("popup_opened");
    // debugger;
    popupWindow.removeEventListener("click", closePopup);
    evt.stopPropagation();
  }
}
