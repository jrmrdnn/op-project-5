// The data variable.
export let data = {
  contact: {
    firstName: undefined,
    lastName: undefined,
    address: undefined,
    city: undefined,
    email: undefined,
  },
  products: [],
};

/**
 * Insert the object into the data variable.
 * @param {object} obj
 * @returns void
 */
export function setData(obj) {
  data = { ...data, ...obj };
}

/**
 * Retrieve the data variable
 * @returns {object} object
 */
export function getData() {
  return data;
}

/**
 * Valid input
 * @param {string} val
 * @returns booleen
 */
export function validData(val) {
  if (typeof val === "string" && val.length > 2) {
    return true;
  } else {
    return false;
  }
}
/**
 * Valid e-mail
 * @param {string} str
 * @returns booleen
 */
export function validEmail(str) {
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (regex.test(str)) {
    return true;
  } else {
    return false;
  }
}
