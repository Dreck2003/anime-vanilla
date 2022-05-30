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
// import Single from "./src/components/SingleCard/SingleCard";
import CardInfo from "./src/components/card_info/CardInfo";
import { getType } from "./src/helpers/ajax/getList";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");

// ; // Get top animes and mangas (length= 10)
setTimeout(() => {
  initTopAnimes();
  getType("anime");
  getType("manga");
}, 2000);
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
    component: CardInfo,
    callback: () => {
      const path = window.location.pathname.split("/").slice(2);
      const url = {
        type: path[1].replaceAll(/%20/gi, " "),
        name: path[0].replaceAll(/%20/gi, " "),
      };
      getSingleCard(url.type, url.name);
    },
  },
]);

// }, 3000);
// });
