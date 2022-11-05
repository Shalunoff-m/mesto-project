const token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
const group = "plus-cohort-16";
const address = "https://mesto.nomoreparties.co";
const profile = "users/me";
const cards = "cards";
export const api = {
  token,
  group,
  cards,
  profile,
  getServerData,
  saveUserProfile,
};

function getServerData(opt) {
  return fetch(`${address}/v1/${group}/${opt}`, {
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return res.json();
  });
}

function saveUserProfile() {
  // TODO Подставить данные из формы
  return fetch(`${address}/v1/${group}/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Какое-то имя",
      about: "Какие-то занятия",
    }),
  }).then((res) => {
    return res.json();
  });
}
