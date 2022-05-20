// import { AnimeState } from "../state";

export const fetchAnime = async () => {
  try {
    const response = await fetch("https://api.jikan.moe/v4/anime");
    const data = await response.json();
    // AnimeState.dispatch()
    console.log(data);
  } catch (error) {
    console.log("Sucedio un error: ", error);
  }
};
