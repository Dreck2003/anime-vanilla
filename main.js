import "./public/css/index.css";
import "./public/css/templates/home.component.css";
import "./public/css/utility/generics.css";
import "./public/css/utility/colors_fonts.css";
import NavBar from "./src/components/NavBar/NavBar";
import { Router } from "./src/modules/Router";
import Home from "./src/components/Home/Home";

// import { fetchAnime } from "./src/services/getAnime";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");
app.appendChild($Nav);

// fetchAnime();

window.addEventListener("DOMContentLoaded", () => {
  Router.routes("#app", [
    {
      url: "/",
      component: Home.render("#app"),
    },
  ]);
});
