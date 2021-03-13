// The state variable.
let state = {
  id: undefined,
  name: undefined,
  list: undefined,
};

/**
 * Insert the object into the state variable.
 * @param {object|string} obj
 * @returns void
 */
export function setState(obj) {
  if (obj.id && obj.name && obj.list) {
    state = obj;
    TagNameTitle(obj.name);
    PushHistory(obj);
    SelectorElementAttr("item-render", "open", true);
  }
}

/**
 * Retrieve the state variable
 * @returns {object} object
 */
export function getState() {
  return state;
}

/**
 * Empty the state variable
 * @returns void
 */
export function delState() {
  TagNameTitle();
  PushHistory();
  SelectorElementAttr("item-render", "open", false);
  state = {
    id: undefined,
    name: undefined,
    list: undefined,
  };
}

/**
 * Change the title document
 * @param {string|void} str
 * @returns void
 */
function TagNameTitle(str) {
  if (str) {
    document.getElementsByTagName("title")[0].innerHTML = "Orinoco | " + str;
    document.getElementsByTagName("h1")[0].innerHTML = str;
  } else {
    document.getElementsByTagName("title")[0].innerHTML = "Orinoco | Accueil";
    document.getElementsByTagName("h1")[0].innerText = "Orinoco accueil";
  }
}

/**
 * Push the history
 * @param {object|void} obj The state variable
 * @returns void
 */
function PushHistory(obj) {
  if (obj) {
    history.pushState(
      {},
      "",
      window.location.pathname + `?list=${obj.list}&_id=${obj.id}`
    );
  } else {
    history.pushState({}, "", window.location.pathname);
  }
}

/**
 * QuerySelector && setAttribute
 * @param {string} name
 * @param {string} key
 * @param {string|object} value
 * @returns void
 */
function SelectorElementAttr(name, key, value) {
  const select = document.querySelector(name);
  if (select) {
    select.setAttribute(key, value);
  }
}
