import "./public/css/index.css";
import NavBar from "./src/components/NavBar/NavBar";
import { DOM } from "./src/modules/Element";
import { Router } from "./src/modules/Router";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");
app.appendChild($Nav);

window.addEventListener("DOMContentLoaded", () => {
  const parrafo = DOM.create("p");
  parrafo.addChilds("HOLA MUNDO");

  Router.routes("#app", [
    {
      url: "/animes",
      component: parrafo,
    },
  ]);
});
