import Anime from "../../components/animeCard/Anime";
import { Arrays } from "../../modules/ArraysUtils";
import { Router } from "../../modules/Router";
import { fetchAnime } from "../../services/getAnime";
import { AnimeState, SingleState } from "../../state/animes";

export const initTopAnimes = () => {
  fetchAnime("/top/manga?limit=10", (error, data) => {
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
  fetchAnime("/top/anime?limit=10", (error, data) => {
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

export const appendCard = (node, items, type) => {
  items.forEach((items) => {
    const props = Arrays.strainer(items, [
      ["images", "jpg"],
      "genres",
      "title_english",
      "title",
      "mal_id",
    ]);
    let $card = Anime.render(node, {
      img: props.images.jpg.image_url || props.images.jpg.large_image_url,
      genres: props.genres.map((gen) => gen.name),
      name: props.title_english || props.title,
      id: props.mal_id,
      type,
    });
    node.appendChild($card);
  });
};

export const getSingleCard = async (type, name) => {
  if (!type || !name) {
    alert("La informacion del: " + type + " no existe");
    Router.navigate("/");
    return;
  }
  try {
    let res = await fetch(`https://api.jikan.moe/v4/${type}?q=${name}`);

    if (res.status !== 200) {
      alert("La informacion del: " + type + " no existe");
      Router.navigate("/");
      return;
    }
    res = await res.json();
    // console.log("La respuesta del single: ", res.data);
    if (res.data && Array.isArray(res.data)) {
      let prop = res.data[0];
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
      ]);
      data = {
        img: data.images.jpg.large_image_url || data.images.jpg.image_url,
        title: data.title_english || data.title,
        synopsis: data.synopsis,
        genres: data.genres.map((gen) => gen.name),
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
      };
      SingleState.dispatch((state) => {
        return {
          ...state,
          ...data,
        };
      });
      console.log("La data: ", data);
    } else {
      alert("Algo paso");
      console.log("DATA: ", res.data);
    }
  } catch (error) {
    console.log("Error en getSingleCard: ", error);
    alert("La informacion del: " + type + " no existe");
    // Router.navigate("/");
  }
};
