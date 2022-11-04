export function initShowImage(name, url, modImage) {
  // debugger;
  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

export function initShow(popup, cbForm) {
  // console.log(popup);

  // берем элементы
  const { closeButton, modal } = popup;
  let form = false;
  // debugger;
  if (popup.form) {
    form = popup.form;
  }

  // вешаем слушатели
  closeButton.addEventListener("click", closePopup);
  modal.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopup);
  // Слушатель на форму, если она есть
  if (form) {
    form.addEventListener("submit", sendData);
  }
  // Открываем сам popup
  openPopup(modal);

  function sendData(evt) {
    evt.preventDefault();
    cbForm(popup);
    closePopup(evt);
  }

  function closePopup(evt) {
    // Отменяем всплытие события
    evt.stopPropagation();
    // console.log(evt.type);

    // Проверяем событие
    if (checkElement(evt)) {
      // снимаем все слушатели
      closeButton.removeEventListener("click", closePopup);
      modal.removeEventListener("click", closePopup);
      document.removeEventListener("keydown", closePopup);
      // закрываем активное модальное окно
      modal.classList.remove("popup_opened");
      if (form) {
        form.removeEventListener("submit", sendData);
      }
    }

    function checkElement(evt) {
      if (evt.target.classList.contains("popup__close")) return true;
      if (evt.target.classList.contains("popup")) return true;
      // if (evt.target.classList.contains("popup")) return true;
      if (evt.key === "Escape") {
        return true;
      }
      if (evt.type === "submit") {
        return true;
      }
      return false;
    }
  }

  function openPopup(modal) {
    modal.classList.add("popup_opened");
  }
}

export function initSubmit(modUserProf, onSaveProfile) {
  modUserProf.form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    onSaveProfile(modUserProf);
  });
}

export function resetForm(form) {
  form.reset();
}
