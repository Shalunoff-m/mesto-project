// Начальный массив карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const userData = {
  name: "Жак-Ив Кусто",
  job: "Исследователь океана",
};

export const uiOpt = {
  base: document,
  elements: {
    photo: { key: ".profile__photo", type: "simple" },
    labelUserName: { key: ".profile__name", type: "simple" },
    labelUserJob: { key: ".profile__job", type: "simple" },
    uiEditButton: { key: ".profile__edit-button", type: "simple" },
    uiAddCardButton: { key: ".profile__add-button", type: "simple" },
  },
};

export const modImageShowOpt = {
  base: "#view-image",
  elements: {
    window: { key: "#view-image", type: "base" },
    image: { key: ".popup__image", type: "simple" },
    description: { key: ".popup__imageName", type: "simple" },
  },
};

export const modUserProfOpt = {
  base: "#popup-edit-job",
  elements: {
    window: { key: "#popup-edit-job", type: "base" },
    form: { key: "popupEditForm", type: "formMain" },
    name: { key: "name", type: "formElement" },
    job: { key: "job", type: "formElement" },
    savebutton: { key: ".popup__submit", type: "simple" },
  },
};

export const modAddPlaceOpt = {
  base: "#popup-new-place",
  elements: {
    window: { key: "#popup-new-place", type: "base" },
    form: { key: "popupNewPlace", type: "formMain" },
    name: { key: "name", type: "formElement" },
    link: { key: "link", type: "formElement" },
    savebutton: { key: ".popup__submit", type: "simple" },
  },
};

export const cardsOpt = {
  base: document,
  elements: {
    container: { key: ".elements__list", type: "simple" },
    template: { key: "#card", type: "simple" },
  },
};
