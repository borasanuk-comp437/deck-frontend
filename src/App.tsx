import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

const App = (): JSX.Element => {
  const [items, setItems] = useState<string[]>([]);
  const addItem = (name: string): void => {
    setItems([...items, name]);
  };
  const createItemTile = (name: string): JSX.Element => {
    return <div className="item-tile">{name}</div>;
  };

  return (
    <>
      <div className="item-list">
        {items.map(e => createItemTile(e))}
      </div>
      <div className="py-1"></div>
      <Button variant="primary" onClick={() => addItem("Eiffel Tower")}>
        Add Item
      </Button>
    </>
  );
};

export default App;
