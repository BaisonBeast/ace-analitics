import React, { useContext } from "react";

import Dishes from "./Dishes";
import { UserContext } from "../contexts/UserContext";

function Result() {
  const { userSelections } = useContext(UserContext);

  const sortedSelections = [...userSelections].sort(
    (a, b) => b.point - a.point
  );

  return (
    <div className="dishlist_item">
      {userSelections.length > 0
        ? sortedSelections.map((dish, index) => (
            <Dishes key={dish.id} dish={dish} text={`Point ${dish.point}`} />
          ))
        : <h1>No Item added, Please add some items.</h1>}
    </div>
  );
}

export default Result;
