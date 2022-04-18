import { ItemData } from "components/item/Item";
import * as React from "react";
import { useState } from "react";
import { citySearch } from "services/TripService";

import "./searchBar.css";

interface SearchBarProps {
  handleSelect: Function;
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const [predictions, setPredictions] = useState<ItemData[]>([]);

  const handleSearch = (query: string) => {
    citySearch(query).then((e) => setPredictions(e));
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        placeholder="Search for a city..."
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
      <div className="search-bar-results-container">
        {predictions.map((e) => (
          <div
            className="search-bar-result"
            onClick={() => {
              props.handleSelect(e);
              setPredictions([]);
            }}
            key={e.place_id}
          >
            {e.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
