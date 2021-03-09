import Axios from 'axios';

const api_key:string = 'Q5SsPX9x1QW58N0onPCJ2hpkbFKBEOXY';

export const getSearchResult = async (searchTerm:string, limit: number, offset: number) => {
  console.log(limit, offset);
  const result = await Axios(`https://api.giphy.com/v1/gifs/search`, {
    params: {
      api_key,
      q: searchTerm,
      limit,
      offset
    }
  });
  return result;
}