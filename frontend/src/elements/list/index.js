import { AttrData } from "../../functions/AttrData";
import { API_URL } from "../../config";
import { setState } from "../../contexts/state";
import NumberToLocal from "../../functions/NumberToLocal";
import "./style.css";

export default class ListRender extends HTMLElement {
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
