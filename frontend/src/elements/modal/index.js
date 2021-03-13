import "./style.css";

export default class ModalDialog extends HTMLElement {
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
