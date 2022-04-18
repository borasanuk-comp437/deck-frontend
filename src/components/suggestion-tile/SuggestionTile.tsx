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
      <div className="suggestion-tile-details">
        <div className="suggestion-tile-details-title">
          {props.itemData.name}
        </div>
        <div className="suggestion-tile-details-desc d-flex">
          <Icon.StarFill className="me-1" />
          {props.itemData.rating + " (" + props.itemData.user_ratings_total + ")"}
        </div>
      </div>
      <img
        src={props.itemData.photo_src}
        className="suggestion-tile-img"
        alt="Place"
      />
    </div>
  );
};

export default SuggestionTile;
