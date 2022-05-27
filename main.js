import "./public/css/index.css";
import "./public/css/templates/home.component.css";
import "./public/css/utility/generics.css";
import "./public/css/utility/colors_fonts.css";
import NavBar from "./src/components/NavBar/NavBar";
import { Router } from "./src/modules/Router";
import Home from "./src/components/Home/Home";
import { getSingleCard, initTopAnimes } from "./src/helpers/ajax/TopAnime";
import ListAnimes from "./src/components/listCards/ListAnimes/ListCards";
import ListMangas from "./src/components/listCards/ListMangas/ListCards";
import Single from "./src/components/SingleCard/SingleCard";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");

initTopAnimes(); // Get top animes and mangas (length= 10)
app.appendChild($Nav);

// setTimeout(() => {
Router.routes("#app", [
  {
    url: "*",
    component: Home,
  },
  {
    url: "/mangas",
    component: ListMangas,
  },
  {
    url: "/animes",
    component: ListAnimes,
  },
  {
    url: "/card/{id}/{type}",
    component: Single,
    callback: () => {
      const path = window.location.pathname.split("/").slice(2);
      console.log("EL path del callback es: ", path);
      getSingleCard(path[1], path[0]);
    },
  },
]);

// }, 3000);
// });
