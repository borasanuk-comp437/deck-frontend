import Item, { ItemData } from "components/item/Item";
import SearchBar from "components/search-bar/SearchBar";
import SuggestionTile from "components/suggestion-tile/SuggestionTile";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getInitialSuggestions, getSuggestions } from "services/TripService";
import "./App.css";

const App = (): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToSuggestions = () =>
    scrollRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  const [city, setCity] = useState<ItemData>();
  const [items, setItems] = useState<ItemData[]>([]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const [choices, setChoices] = useState<ItemData[]>([]);

  const updateChoicesForCity = (city: ItemData): void => {
    let query = city.lat.toString() + "," + city.long.toString();
    getInitialSuggestions(query).then((e) => {
      setChoices(e);
      scrollToSuggestions();
    });
  };

  const updateChoices = (newItems: ItemData[]): void => {
    let query: string = "";
    let exclude: string[] = [];
    query =
      newItems[newItems.length - 1].lat.toString() +
      "," +
      newItems[newItems.length - 1].long.toString();
    exclude = newItems.map((e) => e.place_id);
    let base: string = exclude[exclude.length - 1];
    getSuggestions(query, exclude, base).then((e) => {
      setChoices(e);
      scrollToSuggestions();
    });
  };

  const showChoices = () => {
    return (
      <div className="suggestions-container">
        {choices.length === 0 ? (
          items.length === 0 ? (
            <></>
          ) : (
            <div className="align-self-center">
              <Spinner animation="border"></Spinner>
            </div>
          )
        ) : (
          choices.map((e) => (
            <SuggestionTile
              key={e.place_id}
              itemData={e}
              onClick={() => {
                setChoices([]);
                addItem(e);
                updateChoices([...items, e]);
              }}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="deck-container">
      <div className="container py-3">
        <SearchBar
          handleSelect={(e) => {
            setCity(e);
            updateChoicesForCity(e);
          }}
        />
        <div className="item-list">
          {items.map((e) => (
            <Item itemData={e} key={e.place_id} />
          ))}
        </div>
        <div className="py-1"></div>
        {showChoices()}
        <div className="py-5" ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default App;
