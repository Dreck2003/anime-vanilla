import { AnimeState } from "../../state/animes";

export const getType = async (type) => {
  let response = await fetch(`https://api.jikan.moe/v4/${type}`);
  response = await response.json();
  // Nos trajimos la data:
  // console.log({ response, indice });
  if (Array.isArray(response.data)) {
    AnimeState.dispatch((state) => {
      return {
        ...state,
        seeState: {
          ...state.seeState,
          type: response.data,
        },
      };
    });
  }
};
