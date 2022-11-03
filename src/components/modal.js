export function initShowImage(name, url, modImage) {
  // console.log(name, url, modImage);

  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

export function openPopup(modal) {
  modal.classList.add("popup_opened");
}

export function closePopup(modal) {
  modal.classList.remove("popup_opened");
}

export function initClose(modal, form) {
  modal.addEventListener("click", closeModal);
  document.addEventListener("keydown", clickEsc);
  if (form) {
    form.addEventListener("submit", () => {
      closePopup(modal);
    });
  }

  function closeModal(evt) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(modal);
      modal.removeEventListener("click", closeModal);
      document.removeEventListener("keydown", clickEsc);
    }
  }
  function clickEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(modal);
      modal.removeEventListener("click", closeModal);
      document.removeEventListener("keydown", clickEsc);
    }
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
