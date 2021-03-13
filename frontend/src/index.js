import ListRender from "./elements/list/index";
import ItemRender from "./elements/item/index";
import CartRender from "./elements/cart/index";
import ContactForm from "./elements/contact/index";
import ModalDialog from "./elements/modal/index";
import AlertRender from "./elements/alert/index";

import "./css/typo.css";
import "./css/header.css";
import "./css/layourt.css";
import "./css/footer.css";
import "./css/button.css";

customElements.define("list-render", ListRender);
customElements.define("item-render", ItemRender);
customElements.define("cart-render", CartRender);
customElements.define("contact-form", ContactForm);
customElements.define("modal-dialog", ModalDialog);
customElements.define("alert-render", AlertRender);
