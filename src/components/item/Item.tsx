import React from "react";
import "./item.css";
import * as Icon from "react-bootstrap-icons";

export type ItemData = {
  name: string;
  vicinity: string;
  place_id: string;
  lat: number;
  long: number;
  photo_src: string | undefined;
  rating: number;
  user_ratings_total: number;
  url: string;
  type: string[];
};

const getStars = (rating: number): JSX.Element[] => {
  let stars: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      stars.push(
        <Icon.StarFill
          size={14}
          key={i}
          style={{ marginLeft: 1 }}
          color="orange"
        />
      );
    } else if (rating > 0) {
      stars.push(
        <Icon.StarHalf
          size={14}
          key={i}
          style={{ marginLeft: 1 }}
          color="orange"
        />
      );
    } else {
      stars.push(
        <Icon.Star size={14} key={i} style={{ marginLeft: 1 }} color="orange" />
      );
    }
    rating -= 1;
  }
  return stars;
};
interface ItemProps {
  itemData: ItemData;
}

const Item = (props: ItemProps): JSX.Element => {
  return (
    <div className="item-tile-container">
      <img className="item-photo" src={props.itemData.photo_src} alt="" />
      <div className="item-details-container">
        <div className="item-title">{props.itemData.name}</div>
        <div className="item-desc">{props.itemData.vicinity}</div>
        <div className="d-flex">
          {getStars(props.itemData.rating)}
          <div className="item-reviews px-1">{props.itemData.rating}</div>
        </div>
        <div className="item-reviews mt-auto">
          {props.itemData.user_ratings_total + " reviews"}
        </div>
      </div>
    </div>
  );
};

export default Item;
