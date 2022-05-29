import { ItemData } from "components/item/Item";
import * as React from "react";
import "./suggestionTile.css";
import * as Icon from "react-bootstrap-icons";

interface SuggestionTileProps {
  itemData: ItemData;
  onClick: Function;
}

const SuggestionTile = (props: SuggestionTileProps): JSX.Element => {
  return (
    <div className="suggestion-tile-container" onClick={() => props.onClick()}>
      <img
        src={props.itemData.photo_src}
        className="suggestion-tile-img"
        alt="Place"
      />
      <div className="suggestion-tile-buttons-container">
        <button className="suggestion-tile-icon-button">
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
      <div className="suggestion-tile-details">
        <div className="suggestion-tile-details-title">
          {props.itemData.name}
        </div>
        <div className="suggestion-tile-details-desc d-flex">
          <Icon.StarFill className="me-1" />
          {props.itemData.rating +
            " (" +
            props.itemData.user_ratings_total +
            ")"}
        </div>
      </div>
    </div>
  );
};

export const SuggestionTilePlaceholder = (): JSX.Element => {
  return (
    <div className="suggestion-tile-container bg-dark">
      <div className="suggestion-tile-details p-2">
        <div className="card-title placeholder-glow mb-0">
          <span className="placeholder col-8"></span>
        </div>
        <div className="card-text placeholder-glow">
          <span className="placeholder col-5"></span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionTile;
