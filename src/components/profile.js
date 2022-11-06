import { getButtonText, setButtonText, getDataForm } from "./utils";
import { api } from "./api";
import { closePopup } from "./modal";

export function renderUserProfile(userData, uiCtrl) {
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

export function apiSaveAvatar(opt) {
  console.log(opt.evt);
  // debugger;
  let buttonText = getButtonText(opt.popup.savebutton);
  setButtonText("Сохранение...", opt.popup.savebutton);

  const avaData = getDataForm(opt.popup, opt.settings);
  api
    .saveAvatar(avaData)
    .then((answer) => {
      renderUserProfile(answer, opt.ui);
      closePopup(opt.popup.modal, opt.evt);
    })
    .catch((errData) => {
      console.log(errData);
    })
    .finally(() => {
      setButtonText(buttonText, opt.popup.savebutton);
    });
  console.log("Смена Авы");
}

export function apiSaveProfile(opt) {
  let buttonText = getButtonText(opt.popup.savebutton);
  setButtonText("Сохранение...", opt.popup.savebutton);
  const dataForm = getDataForm(opt.popup, opt.settings);
  api
    .saveUserProfile(dataForm)
    .then((newRemoteUserData) => {
      renderUserProfile(newRemoteUserData, opt.ui);
      closePopup(opt.popup.modal, opt.evt);
    })
    .catch((errData) => {
      console.log(errData);
    })
    .finally(() => {
      setButtonText(buttonText, opt.popup.savebutton);
    });
}
