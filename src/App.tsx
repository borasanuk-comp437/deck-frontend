import React from "react";
import "./App.css";
import Button from 'react-bootstrap/Button';

const App = (): JSX.Element => {
  return (
  <>
  <div className="item-list">
    <div className="item-tile">
      Eiffel Tower
    </div>
    <div className="item-tile">
      Eiffel Tower
    </div>
    <div className="item-tile">
      Eiffel Tower
    </div>
  </div>
  <Button variant="primary">Add Item</Button>
  </>
  );
};

export default App;
