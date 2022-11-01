export function getObj(options) {
  const basePlace = document;
  if (options.base !== document) {
    const basePlace = document.querySelector(`${options.base}`);
  }
  const $result = {};
  for (let key in options.elements) {
    $result[key] = basePlace.querySelector(`${options.elements[key]}`);
  }
  return $result;
}
