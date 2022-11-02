export function initShowImage(name, url, modImage) {
  // console.log(name, url, modImage);

  modImage.description.textContent = name;
  modImage.image.setAttribute("src", url);
  modImage.image.setAttribute("alt", name);
}

export function openPopup(window) {
  window.classList.add("popup_opened");
}

export function closePopup(window) {
  window.classList.remove("popup_opened");
}

export function initClose(window, form) {
  window.addEventListener("click", eventClose);
  document.addEventListener("keydown", clickEsc);
  if (form) {
    form.addEventListener("submit", () => {
      closePopup(window);
    });
  }

  function eventClose(evt) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(window);
      window.removeEventListener("click", eventClose);
      document.removeEventListener("keydown", clickEsc);
    }
  }
  function clickEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(window);
      window.removeEventListener("click", eventClose);
      document.removeEventListener("keydown", clickEsc);
    }
  }
}

export function initSubmit(modUserProf, onUserSaveprof) {
  modUserProf.form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    onUserSaveprof(modUserProf);
  });
}

export function resetForm(form) {
  form.reset();
}
