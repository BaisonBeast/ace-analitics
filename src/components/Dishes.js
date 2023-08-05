import React, { useContext, useState } from "react";

import { UserContext } from "../contexts/UserContext";

function Dishes({ dish }) {
  const { userSelections, setUserSelections } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  const removeExtra = (updatedDishes) => {
    return updatedDishes.filter((d) => d.point <= 30 && d.point >= 10);
  };

  const handleVote = (newRank) => {
    const newPoint = newRank === "Rank 1" ? 30 : newRank === "Rank 2" ? 20 : 10;

    const existingDish = userSelections.find(
      (d) => d.dishName === dish.dishName
    );

    if (existingDish) {
      if (existingDish.point === newPoint) return;
      else if (existingDish.point > newPoint) {
        userSelections.forEach((d) => {
          if (
            d.point >= newPoint &&
            existingDish.dishName !== d.dishName &&
            d.point <= existingDish.point
          ) {
            increasePoints(d);
          }
        });
      } else {
        userSelections.forEach((d) => {
          if (
            d.point <= newPoint &&
            existingDish.dishName !== d.dishName &&
            d.point >= existingDish.point
          ) {
            decreasePoints(d);
          }
        });
      }
      const newArray = userSelections.map((item) => {
        if (item.dishName === dish.dishName) {
          return {
            ...item,
            point: newPoint,
            rank: newRank,
          };
        } else {
          return item;
        }
      });
      setUserSelections(removeExtra(newArray));
    } else {
      const existingPoint = userSelections.find((d) => d.point === newPoint);
      if (existingPoint) {
        userSelections.forEach((d) => {
          if (d.point <= newPoint) {
            decreasePoints(d);
          }
        });
      }
      setUserSelections(
        removeExtra([
          ...userSelections,
          { ...dish, rank: newRank, point: newPoint },
        ])
      );
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const increasePoints = (dishToUpdate) => {
    dishToUpdate.point += 10;
    dishToUpdate.rank =
      dishToUpdate.point === 30
        ? "Rank 1"
        : dishToUpdate.point === 20
        ? "Rank 2"
        : dishToUpdate.point === 10
        ? "Rank 3"
        : "";
  };

  const decreasePoints = (dishToUpdate) => {
    dishToUpdate.point -= 10;
    dishToUpdate.rank =
      dishToUpdate.point === 30
        ? "Rank 1"
        : dishToUpdate.point === 20
        ? "Rank 2"
        : dishToUpdate.point === 10
        ? "Rank 3"
        : "";
  };

  const handleRemoveVote = () => {
    const existingDish = userSelections.find(
      (d) => d.dishName === dish.dishName
    );

    if (existingDish) {
      userSelections.forEach((d) => {
        if (d.point < existingDish.point) {
          increasePoints(d);
        }
      });
      setUserSelections(
        removeExtra(userSelections.filter((d) => d.dishName !== dish.dishName))
      );
    }
  };

  const userVote = userSelections.find((d) => d.dishName === dish.dishName);
  const buttonText = userVote ? `${userVote.rank}` : "Vote⭐";

  return (
    <span className="dish">
      {dish.rank !== "" && (
        <div className="dish_items">
          <h3>{dish.dishName}</h3>
          <p>{dish.description}</p>
          <div className="dish_items_cont">
            <img src={dish.image} alt={dish.dishName} />
            <div className="dropdown">
              <button className="dropbtn">{buttonText}</button>
              <div className="dropdown-content">
                <div
                  className="dropdown-content_ranking"
                  onClick={() => handleVote("Rank 1")}
                >
                  Rank 1
                </div>
                <div
                  className="dropdown-content_ranking"
                  onClick={() => handleVote("Rank 2")}
                >
                  Rank 2
                </div>
                <div
                  className="dropdown-content_ranking"
                  onClick={() => handleVote("Rank 3")}
                >
                  Rank 3
                </div>
                {userVote && (
                  <div
                    className="dropdown-content_ranking"
                    onClick={handleRemoveVote}
                  >
                    Remove Vote
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showNotification && <div className="notification">Item added</div>}
    </span>
  );
}

export default Dishes;
