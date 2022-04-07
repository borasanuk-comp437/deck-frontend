import React from "react";

export const getRandomItem = async (): Promise<string> => {
  const response = await fetch("http://127.0.0.1:5000/randomitem");
  const data = await response.json();
  console.log(data); 
  return "done";
};
