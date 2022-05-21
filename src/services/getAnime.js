// import { AnimeState } from "../state";

import { Arrays } from "../modules/ArraysUtils";

export const fetchAnime = async () => {
  try {
    const response = await fetch("https://api.jikan.moe/v4/anime");
    const data = await response.json();
    // AnimeState.dispatch()
    if (response.status !== 200) {
      return;
    }
    console.log(data.data);
    const animes = [];
    data.data.forEach((anime) => {
      animes.push(
        Arrays.strainer(anime, [
          "synopsis",
          "rank",
          "status",
          "title_english",
          ["images", "jpg"],
          "popularity",
          "mal_id",
          "url",
        ])
      );
    });
    console.log(animes);
  } catch (error) {
    console.log("Sucedio un error: ", error);
  }
};
