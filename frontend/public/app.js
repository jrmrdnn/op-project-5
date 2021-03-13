/**
 * Small rendering of the loop on the options
 * @param {string} attr attribute
 * @param {string[]} data api
 * @returns html
 */
function AttrData(attr, data) {
  if (attr === "teddies") {
    return data.colors.map((s) => `<small>${s}</small>`).join("");
  }
  if (attr === "cameras") {
    return data.lenses.map((s) => `<small>${s}</small>`).join("");
  }
  if (attr === "furniture") {
    return data.varnish.map((s) => `<small>${s}</small>`).join("");
  } else {
    return "";
  }
}

/**
 * Select rendering of the loop on the options
 * @param {string} attr attribute
 * @param {string[]} data api
 * @returns html
 */
function Options(attr, data) {
  if (attr === "teddies") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.colors.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  }
  if (attr === "cameras") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.lenses.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  }
  if (attr === "furniture") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.varnish.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  } else {
    return "";
  }
}

const API_URL = "http://localhost:3000/api/";

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
function setState(obj) {
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
function getState() {
  return state;
}

/**
 * Empty the state variable
 * @returns void
 */
function delState() {
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

/**
 * Return a character string representing a number taking into account the French locality
 * @param {number} num
 * @returns string
 */
function NumberToLocal(num) {
  if (typeof num === "number") {
    return (num / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  } else {
    return "";
  }
}

class ListRender extends HTMLElement {
  async connectedCallback() {
    // Variable attribute
    const attr = this.attributes.list.value;
    localStorage.setItem("attr", attr);

    // Retrieves data from the API
    const response = await fetch(API_URL + attr);
    if (response.status === 200) {
      const data = await response.json();
      this.innerHTML = `<h2>${this.attributes.title.value}</h2>
                          ${data.map(
                            (e) =>
                              `<div class="card" id="${
                                e._id
                              }" list="${attr}" name="${e.name}">
                              <img src="${e.imageUrl}" />
                              <div class="card-content">
                                <h3>${e.name}</h3>
                                ${AttrData(attr, e)}
                                <p>${e.description}</p>
                                <p>Prix: <span>${NumberToLocal(
                                  e.price
                                )}</span></p>
                                </div>
                            </div>`
                          )}`;
    } else {
      this.innerHTML = `<p class="erreur">Erreur ☹️</p>`;
      console.error(response);
    }

    // Retrieves and loops through card events.
    const card = this.querySelectorAll(".card");
    for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", () => {
        document.querySelector("alert-render").setAttribute("valid", false);

        // Insert the object into the state variable.
        setState({
          id: card[i].getAttribute("id"),
          list: card[i].getAttribute("list"),
          name: card[i].getAttribute("name"),
        });
      });
    }
  }

  disconnectedCallback() {}
}

// The data variable.
let data = {
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
function setData(obj) {
  data = { ...data, ...obj };
}

/**
 * Retrieve the data variable
 * @returns {object} object
 */
function getData() {
  return data;
}

/**
 * Valid input
 * @param {string} val
 * @returns booleen
 */
function validData(val) {
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
function validEmail(str) {
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (regex.test(str)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Send in the localStorage
 * @param {object} obj
 * @param {string} opt
 * @returns void
 */
function setStore(obj, opt) {
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
function getStore() {
  return JSON.parse(localStorage.getItem("cart"));
}

/**
 * Deleting an item
 * @param {string} str id
 * @returns void
 */
function removeItemStore(str) {
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
function delStore() {
  localStorage.removeItem("cart");
}

/**
 * Get store id
 * @returns void
 */
function storeId() {
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

class ItemRender extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  async connectedCallback() {
    // Save variable innerHTML
    this.html = this.innerHTML;

    // Listen location search
    this.searchId = window.location.search.split("&_id=");
    this.searchList = this.searchId[0].split("list=")[1];
    this.fetchData();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === "true") {
      // API data variable
      let data;

      // Variable select option
      let setOpt;

      // Retrieve the state variable
      const { id, list } = getState();

      // Retrieves data from the API
      const response = await fetch(`${API_URL}${list}/${id}`);

      if (response.status === 200) {
        data = await response.json();

        this.innerHTML = `<div class="card">
                            <div class="close">X</div>
                            <img src="${data.imageUrl}" />
                            <div class="card-content">
                              <h3>${data.name}</h3>
                              <p>${data.description}</p>
                              ${Options(list, data)}
                              <p>Prix: <span>${NumberToLocal(
                                data.price
                              )}</span></p>
                            </div>
                            <button class="btn-card" disabled>Ajouter au panier</button>
                          </div>`;
      } else {
        console.error(response);
      }

      // Action on closing
      const close = this.querySelector(".close");
      if (close) {
        close.addEventListener("click", () => {
          // Reinsert the old innerHTML
          this.innerHTML = this.html;

          // Empty the state variable
          delState();
        });
      }

      // Action on select
      const opt = this.querySelector("select");
      if (opt) {
        opt.addEventListener("change", () => {
          // If a choice is made => activate the button
          if (opt.value) {
            cart.removeAttribute("disabled");
            setOpt = opt.value;
          } else {
            cart.setAttribute("disabled", true);
          }
        });
      }

      // Action with the button cart
      const cart = this.querySelector(".btn-card");
      if (cart) {
        cart.addEventListener("click", () => {
          this.innerHTML = this.html;
          // Empty the state variable
          delState();

          // Send in the localStorage
          setStore(data, setOpt);

          document.querySelector("alert-render").setAttribute("valid", true);
        });
      }
    }
  }

  async fetchData() {
    if (this.searchId[1] && this.searchList) {
      const response = await fetch(
        `${API_URL}${this.searchList}/${this.searchId[1]}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.name);

        // Insert the object into the state variable.
        setState({
          id: this.searchId[1],
          list: this.searchList,
          name: data.name,
        });
      } else {
        history.pushState({}, "", window.location.pathname);
      }
    }
  }

  disconnectedCallback() {}
}

// Variable total
let total = [];

/**
 * Convert object to array
 * Calculate the total object in array for the function CalculTotal()
 * @param {object} obj
 * @returns array
 */
function ObjectToArray(obj) {
  let target = [];
  Object.entries(obj).forEach((s, i) => {
    target.push([s[0]]);
    Object.entries(s[1]).forEach((k, y) => {
      target[i].push(k);
      total.push(k[1].price * k[1].number);
    });
  });
  return target;
}

/**
 * Calculate the total of the cart
 * @returns number
 */
function CalculTotal() {
  let t = 0;
  if (total) {
    total.forEach((v) => {
      t += v;
    });
  }
  return t;
}

class CartRender extends HTMLElement {
  connectedCallback() {
    // Retrieves data from localStorage
    const store = getStore();

    if (store) {
      this.innerHTML = `${ObjectToArray(store)
        .map(
          (v) => `
    <div class="cart">
      <div class="cart-content">
        <img src="${v[1][1].imageUrl}"/>
        <div class="cart-title">${v[0]}</div>
      </div>
      ${v
        .map((k) =>
          Array.isArray(k)
            ? `<div class="cart-detail">
                  <div><div id="${v[0]},${
                k[0]
              }" class="icon" alt=""></div><span>${k[1].number}</span>${
                k[0]
              }</div>
                  <div>${NumberToLocal(k[1].price * k[1].number)}</div>
                </div>`
            : ""
        )
        .join("")}
    </div>`
        )
        .join("")}
    <div class="cart-detail cart-total">
      <div>Total :</div>
      <div>${NumberToLocal(CalculTotal())}</div>
    </div>
    <button class="btn-cart">Validé le panier</button>`;

      const btnTrash = this.querySelectorAll(".icon");
      if (btnTrash) {
        for (let i = 0; i < btnTrash.length; i++) {
          btnTrash[i].addEventListener("click", () => {
            removeItemStore(btnTrash[i].getAttribute("id"));
          });
        }
      }

      // Action with the button cart
      const btnCart = this.querySelector(".btn-cart");
      if (btnCart) {
        btnCart.addEventListener("click", () => {
          this.innerHTML = `<contact-form></contact-form>`;
          document.getElementsByTagName("title")[0].innerHTML =
            "Orinoco | Formulaire";
          document.getElementsByTagName("h1")[0].innerText =
            "Remplissez les éléments ci-dessous";
        });
      }
    } else {
      this.innerHTML = `
      <div class="cart">
        <div class="cart-content">
          <div class="cart-title">Veuillez sélectionner de·s article·s</div>
        </div>
      </div>
      `;
    }
  }

  disconnectedCallback() {}
}

class ContactForm extends HTMLElement {
  async connectedCallback() {
    // Variable that validates the command
    let valid = false;

    this.innerHTML = `<div class="form-controlle">
                        <label for="firstName">Prénom :</label>
                        <input id="firstName" name="firstName" autocomplete="off">
                      </div>
                      <div class="form-controlle">
                        <label for="lastName">Nom :</label>
                        <input id="lastName" name="lastName" autocomplete="off">
                      </div>
                      <div class="form-controlle">
                        <label for="address">Adresse :</label>
                        <textarea id="address" name="address" rows="3" autocomplete="off"></textarea>
                      </div>
                      <div class="form-controlle">
                        <label for="city">Ville :</label>
                        <input id="city" name="city" autocomplete="off">
                      </div>
                      <div class="form-controlle">
                        <label for="email">E-mail :</label>
                        <input id="email" name="email" autocomplete="off">
                      </div>
                      <button class="btn-cart">Envoyer</button>`;

    document.getElementById("firstName").focus();

    // Action input
    const input = this.querySelectorAll("input");
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("input", (e) => {
        // Retrieve the data variable
        let { contact } = getData();

        // Insert the object into the data variable.
        setData({ contact: { ...contact, [e.target.id]: e.target.value } });
      });
    }

    // Action textarea
    const textarea = this.querySelector("textarea");
    if (textarea) {
      textarea.addEventListener("input", (e) => {
        // Retrieve the data variable
        let { contact } = getData();

        // Insert the object into the data variable.
        setData({ contact: { ...contact, address: e.target.value } });
      });
    }

    // Action with the button cart
    const btnCart = this.querySelector(".btn-cart");
    if (btnCart) {
      btnCart.addEventListener("click", () => {
        // Retrieve the data variable
        let { contact } = getData();

        // Validate each input
        for (const [key, value] of Object.entries(contact)) {
          if (!validData(value)) {
            document.querySelector("alert-render").setAttribute("message", key);
            valid = false;
            window.scroll(0, 0);
            document.getElementById(key).focus();
            break;
          } else if (key === "email" && !validEmail(value)) {
            document.querySelector("alert-render").setAttribute("message", key);
            valid = false;
            window.scroll(0, 0);
            document.getElementById(key).focus();
            break;
          } else {
            document.querySelector("alert-render").setAttribute("message", "");
            valid = true;
          }
        }
        if (valid) {
          // Get store id
          storeId();

          // Retrieves data from the API
          this.sendData();
        }
      });
    }
  }

  async sendData() {
    // Retrieves data from the API
    const attr = localStorage.getItem("attr") || "furniture";
    const response = await fetch(`${API_URL}${attr}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getData()),
    });
    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      this.innerHTML = `<modal-dialog id="${data.orderId}"></modal-dialog>`;
      document.getElementsByTagName("title")[0].innerHTML =
        "Orinoco | Félicitations";
      document.getElementsByTagName("h1")[0].innerText = "";

      // Empty localStorage
      delStore();
    } else {
      document.querySelector("alert-render").setAttribute("error", "error");
    }
  }

  disconnectedCallback() {}
}

class ModalDialog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  <div class="modal-box">
                            <button class="modal-close">X</button>
                            <div class="modal-header">Félicitations !</div>
                            <p>Bien joué ! Votre commande a été validé !</p>
                            <p>Numéro de la commande : ${this.attributes.id.value}</p>
                        </div>`;

    // Action on closing
    const close = this.querySelector(".modal-close");
    if (close) {
      close.addEventListener("click", () => {
        document.location.href = window.location.pathname;
      });
    }
  }

  disconnectedCallback() {}
}

class AlertRender extends HTMLElement {
  static get observedAttributes() {
    return ["message", "valid", "error"];
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // Listen to the attribute message
    // According to the attribute define a message
    if (name === "message") {
      let text = "";
      if (newValue === "firstName") {
        text = "Le prénom";
      }
      if (newValue === "lastName") {
        text = "Le nom";
      }
      if (newValue === "address") {
        text = "L'adresse";
      }
      if (newValue === "city") {
        text = "La ville";
      }
      if (newValue === "email") {
        text = "L'email";
      }
      this.innerHTML = `<div class="alert-danger">${text} doit être renseigné et contenir plus de trois caractères</div>`;
      if (newValue === "") {
        this.innerHTML = "";
      }
    }
    if (name === "valid" && newValue === "true") {
      this.innerHTML = `<div class="alert">L'article a bien été ajouté au panier</div>`;
    }
    if (name === "valid" && newValue === "false") {
      this.innerHTML = "";
    }
    if (name === "error") {
      this.innerHTML = `<div class="alert-danger">Une erreur s'est produite avec le serveur</div>`;
    }
  }

  disconnectedCallback() {}
}

customElements.define("list-render", ListRender);
customElements.define("item-render", ItemRender);
customElements.define("cart-render", CartRender);
customElements.define("contact-form", ContactForm);
customElements.define("modal-dialog", ModalDialog);
customElements.define("alert-render", AlertRender);
