export function renderUserProfile(userData, uiCtrl) {
  uiCtrl.labelUserName.textContent = userData.name;
  uiCtrl.labelUserJob.textContent = userData.job;
}

export function activateBt(bt, cb, modal) {
  bt.addEventListener("click", () => cb(modal));
}

export function initJobData(modUserProf, userData) {
  modUserProf.name.value = userData.name;
  modUserProf.job.value = userData.job;
}

export function saveUserData(data, userData) {
  userData.name = data.name;
  userData.job = data.job;
}
