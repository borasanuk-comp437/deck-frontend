import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Item, { ItemData } from "components/item/Item";
import { getRandomItem, getRandomSuggestions } from "services/TripService";

const App = (): JSX.Element => {
  const [items, setItems] = useState<ItemData[]>([]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const [choices, setChoices] = useState<ItemData[]>([
    { name: "Loading", address: "..." },
  ]);

  const updateChoices = (): void => {
    getRandomSuggestions().then((e) => setChoices(e));
  };

  useEffect(() => {
    console.log("trigger");
    updateChoices();
  }, []);

  const showChoices = () => {
    return (
      <div className="suggestion-container">
        {choices.map((e) => (
          <div
            className="suggestion-tile"
            onClick={() => {
              addItem(e);
              setChoices([]);
              updateChoices();
            }}
          >
            <div className="item-title">{e.name}</div>
            <div className="item-desc">{e.address}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container py-3">
        <div className="item-list">
          {items.map((e) => (
            <Item itemData={e} />
          ))}
        </div>
        <div className="py-1"></div>
        {showChoices()}
      </div>
    </>
  );
};

export default App;
