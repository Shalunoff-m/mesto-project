export const settings = {
  inputError: ".basic-data-input__input_type_error",
  labelError: ".basic-data-input__input-error_active",
  formInput: ".basic-data-input__input",
  formSubmit: ".popup__submit",
};

export const UIButtons = {
  editInfo: ".profile__edit-button",
  addCard: ".profile__add-button",
  changeAvatar: ".profile__avatar",
};

export function activeElement({ selector, handler }) {
  document.querySelector(selector).addEventListener("mousedown", () => {
    handler();
  });
}
