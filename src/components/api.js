const token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
const group = "plus-cohort-16";
const address = "https://nomoreparties.co";
const profile = "users/me";
const cards = "cards";
const like = "likes";
const avatar = "avatar";

const config = {
  baseUrl: `${address}/v1/${group}/`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

export const api = {
  token,
  group,
  cards,
  profile,
  getServerData,
  saveUserProfile,
  saveNewCard,
  deleteCard,
  addLike,
  removeLike,
  saveAvatar,
};

function getServerData(opt) {
  return fetch(`${config.baseUrl}${opt}`, {
    headers: config.headers,
  }).then(checkResponce);
}

function deleteCard(id) {
  return fetch(`${config.baseUrl}${cards}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponce);
}

function addLike(id) {
  return fetch(`${config.baseUrl}${cards}/${like}/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponce);
}

function removeLike(id) {
  return fetch(`${config.baseUrl}${cards}/${like}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponce);
}

function saveUserProfile(dataForm) {
  return fetch(`${config.baseUrl}${profile}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: dataForm.name,
      about: dataForm.job,
    }),
  }).then(checkResponce);
}

function saveNewCard(dataForm) {
  return fetch(`${config.baseUrl}${cards}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: dataForm.name,
      link: dataForm.link,
    }),
  }).then(checkResponce);
}

function saveAvatar(data) {
  return fetch(`${config.baseUrl}${profile}/${avatar}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.link,
    }),
  }).then(checkResponce);
}

function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
