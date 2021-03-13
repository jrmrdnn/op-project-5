import { getStore, removeItemStore } from "../../contexts/store";
import CalculTotal from "../../functions/CalculTotal";
import NumberToLocal from "../../functions/NumberToLocal";
import ObjectToArray from "../../functions/ObjectToArray";
import "./style.css";

export default class CartRender extends HTMLElement {
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
