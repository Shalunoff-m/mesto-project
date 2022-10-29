function showPopupImage(evt) {
  // Извлечение данных события
  const imageClick = evt.target.closest(".elements__item");
  const cardName = imageClick.querySelector(".elements__caption").textContent;
  const cardUrl = imageClick
    .querySelector(".elements__image")
    .getAttribute("src");

  // Присвоение параметров
  $popupImageShow.popupImage.setAttribute("src", cardUrl);
  $popupImageShow.popupImage.setAttribute("alt", cardName);
  $popupImageShow.popupTextImage.textContent = cardName;
  openPopup($popupImageShow.popupWindow);
}

function showPopupEditProfile(userFormElements) {
  $popupEditJob.popupName.value = userFormElements.labelName.textContent;
  $popupEditJob.popupJob.value = userFormElements.labelJob.textContent;
  openPopup($popupEditJob.popupWindow);
}

// Событие записи результатов
$popupEditJob.popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closePopup($popupEditJob.popupWindow);
  exportDataToPage($popupEditJob.popupJob.value, $popupEditJob.popupName.value);
});

//Универсальная функция открытия popup
function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
}

//Универсальная функция закрытия popup
function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_opened");
}

// Универсальное событие закрытия окна
function popupCloseInitialize() {
  const popupCloseElements = document.querySelectorAll(".popup");
  popupCloseElements.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        closePopup(popup);
        evt.stopPropagation();
      }
    });
  });
}

// --------------------------------------------
// Экспорты модулей
