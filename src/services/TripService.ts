import { ItemData } from "components/item/Item";

export const getRandomItem = async (): Promise<ItemData> => {
  const response = await fetch("http://127.0.0.1:5000/randomitem");
  const data = await response.json();
  console.log(data);
  return data;
};

export const getRandomSuggestions = async (): Promise<ItemData[]> => {
  const response = await fetch("http://127.0.0.1:5000/randomsuggestions");
  const data = await response.json();
  console.log(data);
  return data;
};
