import { ItemData } from "components/item/Item";

export const getRandomItem = async (): Promise<ItemData> => {
  const response = await fetch("http://borasanuk.pythonanywhere.com/randomitem");
  const data = await response.json();
  console.log(data);
  return data;
};

export const getRandomSuggestions = async (): Promise<ItemData[]> => {
  const response = await fetch("http://borasanuk.pythonanywhere.com/randomsuggestions");
  const data = await response.json();
  console.log(data);
  return data;
};


export const getSuggestions = async (query: string, exclude: string[]): Promise<ItemData[]> => {
  let url = "http://borasanuk.pythonanywhere.com/suggest?"
  url += "query=" + query + "&exclude=" + exclude
  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  return data;
};

