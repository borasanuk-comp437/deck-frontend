import Item, { ItemData } from "components/item/Item";
import React, { useEffect, useState } from "react";
import {
  getSuggestions
} from "services/TripService";
import "./App.css";

const App = (): JSX.Element => {
  const [items, setItems] = useState<ItemData[]>([
    {
      name: "Paris",
      formatted_address: "France",
      place_id: "...",
      lat: 48.85341,
      long: 2.3488,
      photo_reference: "",
    },
  ]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const [choices, setChoices] = useState<ItemData[]>([
    {
      name: "Loading",
      formatted_address: "...",
      place_id: "...",
      lat: 48.85341,
      long: 2.3488,
      photo_reference: "",
    },
  ]);

  const updateChoices = (): void => {
    console.log(items.map((e) => e.place_id));

    getSuggestions(
      items[0].lat.toString() + "," + items[0].long.toString(),
      items.map((e) => e.place_id)
    ).then((e) => setChoices(e));
  };

  useEffect(() => {
    console.log("trigger");
    updateChoices();
  }, [items]);

  const showChoices = () => {
    return (
      <div className="suggestion-container">
        {choices.map((e) => (
          <div
            className="suggestion-tile"
            onClick={() => {
              setChoices([]);
              addItem(e);
              // updateChoices();
            }}
          >
            <div className="item-title">{e.name}</div>
            <div className="item-desc">{e.formatted_address}</div>
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
