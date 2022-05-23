import { fetchAnime } from "../../services/getAnime";
import { AnimeState } from "../../state/animes";

export const initTopAnimes = () => {
  fetchAnime("/top/manga?limit=10", (error, data) => {
    if (error) {
      throw new Error("Error in fetchAnime");
    }
    AnimeState.dispatch((state) => {
      return {
        ...state,
        topAnimes: data.data,
      };
    });
  });
  fetchAnime("/top/anime?limit=10", (error, data) => {
    if (error) {
      throw new Error("Error in fetchAnime");
    }
    AnimeState.dispatch((state) => {
      return {
        ...state,
        topMangas: data.data,
      };
    });
  });
};
