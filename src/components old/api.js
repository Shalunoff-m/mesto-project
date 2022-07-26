const token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
const group = "plus-cohort-16";
const address = "https://nomoreparties.co";
const profile = "users/me";
const cards = "cards";
const like = "likes";
const avatar = "avatar";
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
  return fetch(`${address}/v1/${group}/${opt}`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
}

function deleteCard(id) {
  return fetch(`${address}/v1/${group}/${cards}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
}

function addLike(id) {
  return fetch(`${address}/v1/${group}/${cards}/${like}/${id}`, {
    method: "PUT",
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
}

function removeLike(id) {
  return fetch(`${address}/v1/${group}/${cards}/${like}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
}

function saveUserProfile(dataForm) {
  return fetch(`${address}/v1/${group}/${profile}`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dataForm.name,
      about: dataForm.job,
    }),
  }).then(checkResponce);
}

function saveNewCard(dataForm) {
  return fetch(`${address}/v1/${group}/${cards}`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dataForm.name,
      link: dataForm.link,
    }),
  }).then(checkResponce);
}

function saveAvatar(data) {
  return fetch(`${address}/v1/${group}/${profile}/${avatar}`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
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
