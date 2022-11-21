import { resetForm } from "./validate";

export function getDataImage(name, url, modImage) {
  // debugger;
  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

export function initShow(popup, options) {
  // берем элементы
  let form = false;
  let formButtonText = "";

  const { closeButton, modal } = popup;
  if (options.type === "form") {
    form = popup.form;
    formButtonText = popup.savebutton.textContent;
  }

  // вешаем слушатели

  closeButton.addEventListener("click", closePopup);
  modal.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopup);
  // Слушатель на форму, если она есть
  if (options.type === "form") {
    form.addEventListener("submit", sendData);
  }
  if (options.reset === true) {
    resetForm(popup);
  }
  // Открываем сам popup
  openPopup(modal);

  // Функция обработки поведения формы
  function sendData(evt) {
    evt.preventDefault();
    onStartExchange(popup, options, evt);
    // options.cb(popup);
    // closePopup(evt);
  }

  function onStartExchange(popup, options, evt) {
    popup.savebutton.textContent = "Сохранение...";
    options.cb(popup, onComplete, evt);
  }
  function onComplete(modal, evt) {
    modal.savebutton.textContent = formButtonText;
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
      if (options.type === "form") {
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
