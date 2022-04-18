import Item, { ItemData } from "components/item/Item";
import SuggestionTile from "components/suggestion-tile/SuggestionTile";
import React, { useEffect, useRef, useState } from "react";
import { getSuggestions } from "services/TripService";
import "./App.css";

const App = (): JSX.Element => {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const scrollToSuggestions = () =>
    suggestionsRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  const [items, setItems] = useState<ItemData[]>([]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const [choices, setChoices] = useState<ItemData[]>([]);

  const updateChoices = (): void => {
    let query: string = "";
    let exclude: string[] = [];

    if (items.length === 0) {
      query = "48.85341,2.3488";
    } else if (items.length > 0) {
      console.log(items[0]);
      query =
        items[items.length - 1].lat.toString() +
        "," +
        items[items.length - 1].long.toString();
      exclude = items.map((e) => e.place_id);
    }
    getSuggestions(query, exclude).then((e) => {
      setChoices(e);
      scrollToSuggestions();
    });
  };

  useEffect(() => {
    console.log(items);

    updateChoices();
  }, [items]);

  const showChoices = () => {
    return (
      <div className="suggestions-container" ref={suggestionsRef}>
        {choices.map((e) => (
          <SuggestionTile
            key={e.place_id}
            itemData={e}
            onClick={() => {
              setChoices([]);
              addItem(e);
              // updateChoices();
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container py-3">
        <div className="item-list">
          {items.map((e) => (
            <Item itemData={e} key={e.place_id} />
          ))}
        </div>
        <div className="py-1"></div>
        {showChoices()}
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
      </div>
    </>
  );
};

export default App;
