export function initShowImage(name, url, modImage) {
  // debugger;
  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

export function initShow(popup, cbForm) {
  // берем элементы
  const { closeButton, modal } = popup;
  let form = false;
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

  // Функция обработки поведения формы
  function sendData(evt) {
    evt.preventDefault();
    cbForm(popup);
    closePopup(evt);
  }

  // Функция для закрытия модалки
  function closePopup(evt) {
    // Отменяем всплытие события
    evt.stopPropagation();

    // Проверяем событие
    if (checkElement(evt)) {
      // Снимаем все слушатели
      closeButton.removeEventListener("click", closePopup);
      modal.removeEventListener("click", closePopup);
      document.removeEventListener("keydown", closePopup);
      // закрываем активное модальное окно
      modal.classList.remove("popup_opened");
      // Если есть форма, то снимаем слушатель и с неё
      if (form) {
        form.removeEventListener("submit", sendData);
      }
    }

    // Функция проверки события
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

  // функция показа окна
  function openPopup(modal) {
    modal.classList.add("popup_opened");
  }
}

// сброс всех полей формы
export function resetForm(popup) {
  popup.form.reset();
  popup.savebutton.disabled = true;
}
