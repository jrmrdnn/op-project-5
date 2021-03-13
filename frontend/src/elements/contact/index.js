import { API_URL } from "../../config";
import { getData, setData, validData, validEmail } from "../../contexts/data";
import { delStore, storeId } from "../../contexts/store";
import "./style.css";

export default class ContactForm extends HTMLElement {
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
