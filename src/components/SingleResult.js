import React from "react";

function SingleResult({ dish }) {
  return (
    <span className="dish">
      <div className="dish_items">
        <h3>{dish.dishName}</h3>
        <p>{dish.description}</p>
        <div className="dish_items_cont">
          <img src={dish.image} alt={dish.dishName} />
          <div className="dropdown">
            <button className="dropbtn">Vote⭐</button>
            <div className="dropdown-content">
              <div className="dropdown-content_ranking">Rank 1</div>
              <div className="dropdown-content_ranking">Rank 2</div>
              <div className="dropdown-content_ranking">Rank 3</div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default SingleResult;
