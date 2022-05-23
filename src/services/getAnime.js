/**
 * @param {string} url
 * @param {(error:any,url:string)=>} callback
 * @returns
 */
export const fetchAnime = async (url, callback) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4${url}`);
    const data = await response.json();
    // AnimeState.dispatch()
    if (response.status !== 200) {
      return;
    }
    // console.log(data.data);
    callback(null, data);
  } catch (error) {
    console.log("Sucedio un error: ", error);
    callback(error, null);
  }
};
