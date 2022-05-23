import "./public/css/index.css";
import "./public/css/templates/home.component.css";
import "./public/css/utility/generics.css";
import "./public/css/utility/colors_fonts.css";
import NavBar from "./src/components/NavBar/NavBar";
import { Router } from "./src/modules/Router";
import Home from "./src/components/Home/Home";
import { initTopAnimes } from "./src/helpers/ajax/TopAnime";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");
app.appendChild($Nav);

initTopAnimes(); // Get top animes and mangas (length= 10)
console.log("Se llamo a los animes!");

window.addEventListener("DOMContentLoaded", () => {
  Router.routes("#app", [
    {
      url: "/",
      component: Home,
    },
  ]);
});
