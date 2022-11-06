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

export function initAvatarData(uiCtrl, modAvatar) {
  modAvatar.link.value = uiCtrl.photo.getAttribute("src");
}
