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

  const [items, setItems] = useState<ItemData[]>([
    {
      name: "Paris",
      vicinity: "France",
      place_id: "...",
      lat: 48.85341,
      long: 2.3488,
      photo_src: undefined,
      rating: 0,
      user_ratings_total: 0,
    },
  ]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const [choices, setChoices] = useState<ItemData[]>([
    {
      name: "Loading",
      vicinity: "...",
      place_id: "...",
      lat: 48.85341,
      long: 2.3488,
      photo_src: "",
      rating: 0,
      user_ratings_total: 0,
    },
  ]);

  const updateChoices = (): void => {
    getSuggestions(
      items[0].lat.toString() + "," + items[0].long.toString(),
      items.map((e) => e.place_id)
    ).then((e) => {
      setChoices(e);
      scrollToSuggestions();
    });
  };

  useEffect(() => {
    updateChoices();
  }, [items]);

  const showChoices = () => {
    return (
      <div className="suggestions-container" ref={suggestionsRef}>
        {choices.map((e) => (
          <SuggestionTile
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
            <Item itemData={e} />
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
