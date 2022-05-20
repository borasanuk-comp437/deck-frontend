import { ItemData } from "components/item/Item";

const key = "AIzaSyCw9ZcuO_ASGpg2nRcfFJOvVbI1ZHqVnYs";

export const getRandomItem = async (): Promise<ItemData> => {
  const response = await fetch(
    "http://127.0.0.1:5000/randomitem"
  );
  const data = await response.json();
  return data;
};

export const getRandomSuggestions = async (): Promise<ItemData[]> => {
  const response = await fetch(
    "http://127.0.0.1:5000/randomsuggestions"
  );
  const data = await response.json();
  return data;
};

export const getInitialSuggestions = async (
  query: string,
): Promise<ItemData[]> => {
  let url = "http://127.0.0.1:5000/simplesuggest?";
  url += "query=" + query;
  const response = await fetch(url);
  const data = await response.json();
  for (let item of data) {
    item.photo_src = getPhotoSrc(item.photos[0].photo_reference);
    item.lat = item.geometry.location.lat;
    item.long = item.geometry.location.lng;
  }

  return data;
};

export const getSuggestions = async (
  query: string,
  exclude: string[],
  base_id: string
): Promise<ItemData[]> => {
  let url = "http://127.0.0.1:5000/suggest?";
  url += "query=" + query + "&exclude=" + exclude + "&base_id=" + base_id;
  const response = await fetch(url);
  const data = await response.json();
  for (let item of data) {
    item.photo_src = getPhotoSrc(item.photos[0].photo_reference);
    item.lat = item.geometry.location.lat;
    item.long = item.geometry.location.lng;
  }

  return data;
};

export const getPhotoSrc = (photo_reference: string): string => {
  let url = "https://maps.googleapis.com/maps/api/place/photo?";
  url += "photo_reference=" + photo_reference + "&maxwidth=400&key=" + key;
  return url;
};

export const citySearch = async (query: string): Promise<ItemData[]> => {
  let url = "http://127.0.0.1:5000/citysearch?"
  url += "query=" + query;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
