const token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
const group = "plus-cohort-16";
const address = "https://nomoreparties.co";
const profile = "users/me";
const cards = "cards";
const like = "likes";
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

function deleteCard(id) {
  return fetch(`${address}/v1/${group}/${cards}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return res.json();
  });
}

function addLike(id) {
  return fetch(`${address}/v1/${group}/${cards}/${like}/${id}`, {
    method: "PUT",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return res.json();
  });
}

function removeLike(id) {
  return fetch(`${address}/v1/${group}/${cards}/${like}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return res.json();
  });
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
  }).then((res) => {
    return res.json();
  });
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
  }).then((res) => {
    return res.json();
  });
}
