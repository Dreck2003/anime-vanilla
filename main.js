import "./public/css/index.css";
import "./public/css/templates/components.css";
import "./public/css/utility/generics.css";
import "./public/css/utility/colors_fonts.css";
import NavBar from "./src/components/NavBar/NavBar";
import { DOM } from "./src/modules/Element";
import { Router } from "./src/modules/Router";

import { fetchAnime } from "./src/services/getAnime";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");
app.appendChild($Nav);

fetchAnime();

window.addEventListener("DOMContentLoaded", () => {
  const parrafo = DOM.create("p");
  parrafo.addChilds("HOLA MUNDO");
  Router.routes();
});
