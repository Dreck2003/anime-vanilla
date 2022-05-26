import "./public/css/index.css";
import "./public/css/templates/home.component.css";
import "./public/css/utility/generics.css";
import "./public/css/utility/colors_fonts.css";
import NavBar from "./src/components/NavBar/NavBar";
import { Router } from "./src/modules/Router";
import Home from "./src/components/Home/Home";
import { initTopAnimes } from "./src/helpers/ajax/TopAnime";
import ListCards from "./src/components/listCards/ListCards";

const $Nav = NavBar.render("#app");
const app = document.getElementById("app");

initTopAnimes(); // Get top animes and mangas (length= 10)
app.appendChild($Nav);

const oneList = { ...ListCards };
Object.setPrototypeOf(oneList, Object.getPrototypeOf(ListCards));

const twoList = { ...ListCards };
Object.setPrototypeOf(twoList, Object.getPrototypeOf(ListCards));

// setTimeout(() => {
Router.routes("#app", [
  {
    url: "/",
    component: Home,
  },
  {
    url: "/mangas",
    component: oneList,
    props: { title: "Mangas" },
  },
  {
    url: "/animes",
    component: twoList,
    props: { title: "Animes" },
  },
]);

// }, 3000);
// });
