const token = "269e9438-b227-400f-84a0-3e13cb6c82c5";
const group = "plus-cohort-16";
const address = "https://mesto.nomoreparties.co";
const profile = "users/me";
export const api = {
  token,
  group,
  getProfile,
};

function getProfile(cbForData, targetElement) {
  return fetch(`${address}/v1/${group}/${profile}`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так, ответа нет: ${res.status}`);
    })
    .then((result) => {
      // console.log(result);
      cbForData(result, targetElement);
    })
    .catch((err) => {
      console.log(err);
    });
}
