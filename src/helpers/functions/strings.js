export const Capitalize = (cadena) => {
  //   console.log(cadena);
  return cadena[0].toUpperCase() + cadena.slice(1);
};
export const Title = (cadena) => {
  let up = "";
  cadena.split(" ").forEach((word) => {
    // console.log(word);
    up += Capitalize(word);
  });
  return up;
};
