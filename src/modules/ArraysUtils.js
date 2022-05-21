export class Arrays {
  constructor() {}

  /**
   * @param {number} max The maximum number of laps
   * @param {(index:number)=>void} callback The executable function for each turn.
   */
  static loop(max, callback) {
    if (typeof max !== "number") {
      throw new Error(`The ${max} is not a number`);
    }
    let index = 1;
    let returnBreak = 1000000000;
    while (index <= max) {
      callback(index);
      if (index === returnBreak) {
        throw new Error("The number of turns is too much");
      }
      index++;
    }
  }

  /**
   * @param {{}} object1 Object initial
   * @param {[]} properties Properties to filter from object1
   * @return {object1} New object with filter properties of Object1
   */
  static strainer(object1, properties) {
    const newObject = {};
    for (let i = 0; i < properties.length; i++) {
      if (Array.isArray(properties[i])) {
        // SI la prop es un array,vemos si la primera prop existe en el object
        let prop = properties[i][0];
        if (Object.hasOwnProperty.call(object1, prop)) {
          // Si la propiedad existe, entonces lo agregamos a newObject:
          const nuevo = this.strainer(object1[prop], properties[i].slice(1));
          // console.log("La sub_prop: ", properties[i]);
          newObject[prop] = nuevo;
        } else {
          newObject[prop] = null;
        }
      } else {
        if (Object.hasOwnProperty.call(object1, properties[i])) {
          // Si la propiedad existe, entonces lo agregamos a newObject:
          newObject[properties[i]] = JSON.parse(
            JSON.stringify(object1[properties[i]])
          );
        } else {
          newObject[properties[i]] = null;
        }
      }
    }
    return newObject;
  }
}
