export function getObj(options) {
  // debugger;
  let basePlace = document;
  if (options.base !== document) {
    basePlace = document.querySelector(`${options.base}`);
  }
  const $result = {};
  let $form = {};
  for (let elem in options.elements) {
    // console.log(elem);
    // options.elements.key.type
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
