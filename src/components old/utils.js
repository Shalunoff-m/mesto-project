export function getObj(options) {
  //
  let basePlace = document;
  if (options.base !== document) {
    basePlace = document.querySelector(`${options.base}`);
  }
  const $result = {};
  let $form = {};
  for (let elem in options.elements) {
    if (options.elements[elem].type === "base") {
      $result[elem] = document.querySelector(`${options.elements[elem].key}`);
    }
    if (options.elements[elem].type === "simple") {
      $result[elem] = basePlace.querySelector(`${options.elements[elem].key}`);
    }
    if (options.elements[elem].type === "formMain") {
      const key = options.elements[elem].key;
      $form = document.forms[`${key}`];
      $result[elem] = $form;
    }
    if (options.elements[elem].type === "formElement") {
      const key = options.elements[elem].key;
      // $form = $form.elements[`${key}`];
      $result[elem] = $form.elements[`${key}`];
    }
  }

  return $result;
}

/* const simpleDataTemplate = {
  base: 'some base level',
  elements: {
    element1: {key: '.tag', type: 'simple'},
    element2: {key: 'name', type: 'formMain'},
    element3: {key: 'name', type: 'formElement'},
  }
} */

export function getDataForm(modal, opt) {
  //
  const data = {};

  for (let item in opt.elements) {
    if (opt.elements[item].type === "formElement") {
      data[item] = opt.elements[item].key;
    }
  }

  for (let key in data) {
    //
    // modal[key].value = data[key];
    data[key] = modal[key].value;
  }
  return data;
}

export function getButtonText(button) {
  return button.textContent;
}
export function setButtonText(text, button) {
  button.textContent = text;
}
