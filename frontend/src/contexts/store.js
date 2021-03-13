import { setData, data } from "./data";

/**
 * Send in the localStorage
 * @param {object} obj
 * @param {string} opt
 * @returns void
 */
export function setStore(obj, opt) {
  const { _id, name, imageUrl, price } = obj;
  let store = getStore();
  if (store) {
    if (store[name]) {
      if (store[name][opt]) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...store,
            [name]: {
              ...store[name],
              [opt]: {
                _id,
                name,
                imageUrl,
                price,
                number: store[name][opt].number + 1,
              },
            },
          })
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...store,
            [name]: {
              ...store[name],
              [opt]: {
                _id,
                name,
                imageUrl,
                price,
                number: 1,
              },
            },
          })
        );
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...store,
          [name]: {
            ...store[name],
            [opt]: {
              _id,
              name,
              imageUrl,
              price,
              number: 1,
            },
          },
        })
      );
    }
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        [name]: {
          [opt]: {
            _id,
            name,
            imageUrl,
            price,
            number: 1,
          },
        },
      })
    );
  }
}

/**
 * Retrieves data from localStorage
 * @returns object
 */
export function getStore() {
  return JSON.parse(localStorage.getItem("cart"));
}

/**
 * Deleting an item
 * @param {string} str id
 * @returns void
 */
export function removeItemStore(str) {
  const target = str.split(",");
  let newStore = getStore();
  Object.entries(newStore).forEach((k) => {
    if (k[0] === target[0]) {
      const name = k[0];
      Object.entries(k[1]).forEach((v) => {
        if (v[0] === target[1]) {
          const item = v[0];
          delete newStore[name][item];
          if (Object.keys(newStore[name]).length === 0) {
            delete newStore[name];
            if (Object.keys(newStore).length === 0) {
              newStore = undefined;
            }
          }
        }
      });
    }
  });
  if (newStore) {
    localStorage.setItem("cart", JSON.stringify(newStore));
  } else {
    delStore();
  }
  document.location.reload();
}

/**
 * Empty localStorage
 * @returns void
 */
export function delStore() {
  localStorage.removeItem("cart");
}

/**
 * Get store id
 * @returns void
 */
export function storeId() {
  const store = getStore();
  for (const [keys, values] of Object.entries(store)) {
    for (const [key, value] of Object.entries(values)) {
      for (const [k, v] of Object.entries(value)) {
        if (k === "_id") {
          setData({ products: [...data.products, v] });
        }
      }
    }
  }
}
