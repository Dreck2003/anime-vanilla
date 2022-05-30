import Anime from "../../components/animeCard/Anime";
import { Arrays } from "../../modules/ArraysUtils";
import { Router } from "../../modules/Router";
import { fetchAnime } from "../../services/getAnime";
import { AnimeState, MoreCards, SingleState } from "../../state/animes";

export const initTopAnimes = () => {
  fetchAnime("/top/manga?limit=20", (error, data) => {
    if (error) {
      console.log("error: ", error);
      // throw new Error("Error in fetchManga");
      return;
    }

    AnimeState.dispatch((state) => {
      return {
        ...state,
        topAnimes: data.data,
      };
    });
    // console.log("Termino el fetchAnime");
  });
  fetchAnime("/top/anime?limit=20", (error, data) => {
    if (error) {
      console.log("error: ", error);
      // throw new Error("Error in fetchAnime");
      return;
    }
    AnimeState.dispatch((state) => {
      return {
        ...state,
        topMangas: data.data,
      };
    });
    // console.log("Termino el fetchAnime");
  });
};

export const appendCard = (node, items) => {
  items.forEach((item) => {
    // console.log(item);
    const props = Arrays.strainer(item, [
      ["images", "jpg"],
      "genres",
      "title_english",
      "title",
      "mal_id",
      "type",
    ]);
    // console.log("Los props son: ", props);
    let $card = Anime.render(node, {
      img: props.images.jpg.image_url || props.images.jpg.large_image_url,
      genres: props.genres.map((gen) => gen.name),
      name: props.title_english || props.title,
      id: props.mal_id,
      type: props.type == "Magas" ? props.type : "anime",
    });
    // console.log("La card es: ", $card);
    node.appendChild($card);
  });
};

export const getSingleCard = async (type, name) => {
  console.log({ type, name });
  if (!type || !name) {
    alert("La informacion del: " + type + " no existe");
    Router.navigate("/");
    return;
  }
  try {
    let res = await fetch(
      `https://api.jikan.moe/v4/${type}?q=${name}&limit=10`
    );

    if (res.status == 429) {
      alert("An error ocurred");
      Router.navigate("/");
      return;
    }

    if (res.status !== 200) {
      alert("La informacion del: " + type + " no existe");
      Router.navigate("/");
      return;
    }

    res = await res.json();
    if (res.data && Array.isArray(res.data)) {
      const oneCard = res.data.findIndex((card) => {
        if (card.title === name || card.title_english == name) {
          return true;
        }
        return (
          card.type === type || card.type === "Movie" || card.type == "Manga"
        );
      });
      // debugger;

      let prop = res.data[oneCard] || res.data[0];
      const data = strainerProps(prop);

      // Agora debemos recortar el array para ponerlo en la seccion: `Relationates`

      const arrayCards = res.data
        .slice(0, oneCard)
        .concat(res.data.slice(oneCard + 1))
        .slice(0, 6);
      SingleState.dispatch((state) => {
        return {
          ...state,
          ...data,
        };
      });

      MoreCards.dispatch(() => {
        return Array.isArray(arrayCards) && arrayCards;
      });
      // console.log("EL estado del array es: ", MoreCards.state);
    } else {
      alert("Algo paso");
      console.log("DATA: ", res.data);
    }
  } catch (error) {
    console.log("Error en getSingleCard: ", error);
    alert("La informacion del: " + type + " no existe");
    Router.navigate("/");
  }
};

const strainerProps = (prop) => {
  let data = Arrays.strainer(prop, [
    ["images", "jpg"],
    "genres",
    "title_english",
    "title",
    "mal_id",
    "score",
    "synopsis",
    "trailer",
    "type",
    "url",
    "year",
    "status",
    "popularity",
    "authors",
    "chapters",
    ["published", "string"],
  ]);

  data = {
    img: data.images.jpg.image_url || data.images.jpg.large_image_url,
    title: data.title_english || data.title,
    synopsis: data.synopsis,
    genres: Array.isArray(data.genres)
      ? data.genres.map((gen) => gen.name)
      : [],
    score: data.score,
    status: data.status,
    popularity: data.popularity,
    trailer: data.trailer && {
      embed_url: data.trailer.embed_url || "",
      url: data.trailer.url || "",
      img: data.trailer.images.image_url || "",
    },
    type: data.type,
    url: data.url,
    year: data.year,
    authors: Array.isArray(data.authors)
      ? data.authors.map((auth) => auth.name)
      : [],
    chapters: data.chapters,
    published: data.published
      ? data.published.string
      : "There is no information",
  };
  return data;
};
