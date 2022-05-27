import { appendCard } from "../helpers/ajax/TopAnime";

export const getChunkAnime = async (node, indice, type) => {
  console.log("EL indice es: ", indice);
  try {
    if (!node.children.length) {
      // Si el nodo no tiene hijos
      let response = await fetch(`https://api.jikan.moe/v4/${type}`);
      response = await response.json();
      // Nos trajimos la data:
      // console.log({ response, indice });
      if (response.data) {
        appendCard(node, response.data, type);
      }
    }

    // Aca no debemos poner un else por que luego de asignarle mas hijos al padre
    // Debemos tener un observer en el ultimo hijo:
    const lastChild = node.lastElementChild;
    if (lastChild) {
      // Si el ultimo elemento existe:
      const callbackObserver = (entries) => {
        let child = entries[entries.length - 1];
        // console.log("El ultimo entry: ", child);
        // console.log("Las entries: ", entries);
        if (child.isIntersecting) {
          // Si esta viendo
          if (indice > 6) return;
          setTimeout(async () => {
            let response = await fetch(
              `https://api.jikan.moe/v4/${type}?page=${indice + 1}`
            );
            response = await response.json();

            // Ahora tenemos que añadir la nueva data:

            if (response.data) {
              appendCard(node, response.data, type);
            }

            if (response.pagination["has_next_page"]) {
              // Si habia una siguiente paguina, entonces haciamos la recursion:
              getChunkAnime(node, indice + 1, type);
            }
          }, 2000);
        }
      };

      const observer = new IntersectionObserver(callbackObserver, {});
      observer.observe(lastChild);
    } else {
      console.log("No existe el ultimo hijo: ", node.childre);
    }
  } catch (error) {
    console.log("error en getChunckAnime: ", error);
  }
};
