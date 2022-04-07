import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Item, { ItemData } from "components/item/Item";

const App = (): JSX.Element => {
  const [items, setItems] = useState<ItemData[]>([]);
  const addItem = (name: string): void => {
    setItems([...items, { name: name, address: "Paris" }]);
  };

  return (
    <>
      <div className="container py-3">
        <Button
          variant="primary"
          onClick={() => {
            addItem("Eiffel Tower");
          }}
        >
          Add Item
        </Button>
        <div className="item-list">
          {items.map((e) => (
            <Item itemData={e} />
          ))}
        </div>
        <div className="py-1"></div>
      </div>
    </>
  );
};

export default App;
