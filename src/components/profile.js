export function renderUserProfile(userData, uiCtrl) {
  // console.log(userData);
  uiCtrl.labelUserName.textContent = userData.name;
  uiCtrl.labelUserJob.textContent = userData.about;
  uiCtrl.photo.setAttribute("src", userData.avatar);
}

export function activateBt(bt, cb, modal) {
  bt.addEventListener("click", () => cb(modal));
}

export function initJobData(uiCtrl, modUserProf) {
  modUserProf.name.value = uiCtrl.labelUserName.textContent;
  modUserProf.job.value = uiCtrl.labelUserJob.textContent;
}

export function saveUserData(profile, userData) {
  // debugger;
  userData.name = profile.name;
  userData.about = profile.about;
  userData.avatar = profile.avatar;
  userData.id = profile._id;
  userData.cohort = profile.cohort;
  // userData.name = data.name;
  // userData.job = data.job;
}
