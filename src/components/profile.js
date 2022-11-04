export function renderUserProfile(userData, uiCtrl) {
  // console.log(userData);
  uiCtrl.labelUserName.textContent = userData.name;
  uiCtrl.labelUserJob.textContent = userData.about;
  // console.log(userData.avatar);
  uiCtrl.photo.setAttribute("src", userData.avatar);
}

export function activateBt(bt, cb, modal) {
  bt.addEventListener("click", () => cb(modal));
}

export function initJobData(userData, modUserProf) {
  modUserProf.name.value = userData.name;
  modUserProf.job.value = userData.about;
}

export function saveUserData(data, userData) {
  userData.name = data.name;
  userData.job = data.job;
}
