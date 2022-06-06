import { ItemData } from "components/item/Item";
import * as React from "react";
import "./suggestionTile.css";
import * as Icon from "react-bootstrap-icons";

interface SuggestionTileProps {
  itemData: ItemData;
  handleSelect: Function;
  handleRemove: Function;
}

const SuggestionTile = (props: SuggestionTileProps): JSX.Element => {
  return (
    <div className="suggestion-tile-container">
      <img
        src={props.itemData.photo_src}
        className="suggestion-tile-img"
        alt="Place"
      />
      <div className="suggestion-tile-buttons-container">
        <button className="suggestion-tile-icon-button">
          <i className="bi bi-info-circle me-2"></i>
          <a
            href={props.itemData.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "white" }}
          >
            Details
          </a>
        </button>
        <div className="py-4"></div>
        <button
          className="suggestion-tile-icon-button"
          onClick={() => props.handleSelect()}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add to my list
        </button>
        <button
          className="suggestion-tile-icon-button"
          onClick={() => props.handleRemove(props.itemData)}
        >
          <i className="bi bi-dash-circle me-2"></i>
          Dismiss
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
