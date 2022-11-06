import { resetForm } from "./validate";

export function activateModal(cb) {
  [...document.forms].forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      cb(evt);
    });
  });

  document.querySelectorAll(".popup").forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      evt.stopPropagation();
      closePopup(evt.target.closest(".popup"), evt);
    });
  });
}

export function getDataImage(name, url, modImage) {
  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

let modalActive = {};

export function openPopup(modal, opt) {
  modalActive = modal;
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", onClose);
  if (opt.reset) {
    resetForm(opt.modal);
  }
}

function onClose(evt) {
  closePopup(modalActive, evt);
}

export function closePopup(popup, evt) {
  // console.log(popup, evt);
  if (checkElement(evt)) {
    document.removeEventListener("keydown", onClose);
    popup.classList.remove("popup_opened");
  }

  // Функция проверки элемента клика
  function checkElement(evt) {
    if (evt.target.classList.contains("popup__close")) return true;
    if (evt.target.classList.contains("popup")) return true;
    if (evt.type === "submit") {
      return true;
    }
    if (evt.key === "Escape") {
      return true;
    }
    return false;
  }
}
