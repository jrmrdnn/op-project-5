import "./style.css";

export default class AlertRender extends HTMLElement {
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
