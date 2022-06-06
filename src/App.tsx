import Item, { ItemData } from "components/item/Item";
import SearchBar from "components/search-bar/SearchBar";
import SuggestionTile, {
  SuggestionTilePlaceholder,
} from "components/suggestion-tile/SuggestionTile";
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

  const [choiceLock, setChoiceLock] = useState<boolean>(true);
  const [city, setCity] = useState<ItemData>();
  const [items, setItems] = useState<ItemData[]>([]);
  const addItem = (itemData: ItemData): void => {
    setItems([...items, itemData]);
  };

  const deleteItem = (item: ItemData) => {
    setItems(items.filter((e) => e !== item));
  };

  const reset = () => {
    setCity(undefined);
    setItems([]);
    setChoices([]);
  };

  const [choices, setChoices] = useState<ItemData[]>([]);

  const updateChoicesForCity = (city: ItemData): void => {
    let query = city.lat.toString() + "," + city.long.toString();
    getInitialSuggestions(query).then((e) => {
      setChoices(e);
      scrollToSuggestions();
    });
  };

  const getNewChoices = (excluded: ItemData[], _items: ItemData[]) => {
    let query: string = "";
    query =
      excluded[excluded.length - 1].lat.toString() +
      "," +
      excluded[excluded.length - 1].long.toString();
    const exclude = excluded.map((e) => e.place_id);
    let base: string = exclude[exclude.length - 1];
    getSuggestions(query, exclude, base).then((e) => {
      console.log(e);
      addChoices(e, _items);
      setChoiceLock(true);
    });
  };

  const addChoices = (newChoices: ItemData[], currentItems?: ItemData[]) => {
    const _items = currentItems ? currentItems : items;

    let _choices = [...choices, ...newChoices];
    if (_items.length > 0 && choices.length > 0) {
      _choices = _choices.filter((e) => {
        if (e === undefined) {
          return true;
        }
        for (const item of _items) {
          if (e.place_id === item.place_id) {
            return false;
          }
        }
        console.log(e);
        return true;
      });
    }
    setChoices(_choices);

    // setChoices([...choices, ...newChoices]);
  };

  const handleSelect = (selected: ItemData) => {
    if (!choiceLock || choices.length > 15) {
      setChoices(choices.filter((e) => e !== selected));
      const _items = [...items, selected];
      setItems(_items);
      return;
    }
    setChoiceLock(false);
    const _items = [...items, selected];
    setItems(_items);
    addChoices(Array(3).fill(undefined), _items);
    getNewChoices([...choices, ..._items], _items);
  };

  const handleRemove = (choice: ItemData) => {
    setChoices(choices.filter((e) => e !== choice));
  };

  const showChoices = () => {
    return (
      <div className="d-flex flex-column">
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
            choices.map((e) => {
              if (e === undefined) {
                return <SuggestionTilePlaceholder />;
              } else {
                return (
                  <SuggestionTile
                    key={e.place_id}
                    itemData={e}
                    handleSelect={() => {
                      handleSelect(e);
                    }}
                    handleRemove={() => {
                      handleRemove(e);
                    }}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="deck-container">
      <div className="container py-3">
        {city ? (
          <div className="d-flex justify-content-between align-items-center">
            <h1 style={{ color: "white" }}>{city.name}</h1>
            <div style={{ color: "white", fontSize: 16, cursor: "pointer" }}>
              <i
                className="bi bi-arrow-counterclockwise"
                onClick={() => reset()}
              ></i> Reset
            </div>
          </div>
        ) : (
          <SearchBar
            handleSelect={(e) => {
              setCity(e);
              updateChoicesForCity(e);
            }}
          />
        )}
        <h3 style={{ color: "white" }}>My List</h3>
        <div className="item-list">
          {items.map((e) => (
            <Item itemData={e} key={e.place_id} onRemove={deleteItem} />
          ))}
        </div>
        <div className="py-1"></div>
        <div className="py-2"></div>
        <h3 style={{ color: "white" }}>Suggestions</h3>
        {showChoices()}
        <div className="py-5" ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default App;
