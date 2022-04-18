import React from "react";
import "./item.css";

export type ItemData = {
  name: string;
  formatted_address: string;
  place_id: string;
  lat: number;
  long: number;
  photo_reference: string;
};


interface ItemProps {
  itemData: ItemData;
}

const Item = (props: ItemProps): JSX.Element => {
  return (
    <div className="item-tile-container">
      <div className="item-title">{props.itemData.name}</div>
      <div className="item-desc">{props.itemData.formatted_address}</div>
    </div>
  );
};

export default Item;
