import { ItemData } from "components/item/Item";

const key = "AIzaSyCw9ZcuO_ASGpg2nRcfFJOvVbI1ZHqVnYs";

export const getRandomItem = async (): Promise<ItemData> => {
  const response = await fetch(
    "http://borasanuk.pythonanywhere.com/randomitem"
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const getRandomSuggestions = async (): Promise<ItemData[]> => {
  const response = await fetch(
    "http://borasanuk.pythonanywhere.com/randomsuggestions"
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const getSuggestions = async (
  query: string,
  exclude: string[]
): Promise<ItemData[]> => {
  let url = "http://borasanuk.pythonanywhere.com/suggest?";
  url += "query=" + query + "&exclude=" + exclude;
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
  let url = "http://borasanuk.pythonanywhere.com/citysearch?"
  url += "query=" + query;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};
