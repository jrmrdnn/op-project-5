import { Options } from "../../functions/AttrData";
import { delState, getState, setState } from "../../contexts/state";
import { setStore } from "../../contexts/store";
import { API_URL } from "../../config";
import NumberToLocal from "../../functions/NumberToLocal";
import "./style.css";

export default class ItemRender extends HTMLElement {
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
