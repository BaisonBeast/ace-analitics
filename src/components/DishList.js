import React, { useEffect, useState } from "react";

import Dishes from "./Dishes";
import ErrorComponent from "../components/Error";

function DishList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  console.log(error)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dctacademy/react-task/main/db.json"
        );
        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error(errorData.message || 'Unknown Error');
          error.code = response.status;
          setError(error);
        } else {
          const res = await response.json();
          setDishes(res);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    (() => {
      fetchData();
    })();
  }, []);

  return (
    <div className="dishlist">
      {error ? (
        <ErrorComponent errorCode={error.code} errorMessage={error.message} />
      ) : loading ? (
        "Loading..."
      ) : (
        <div className="dishlist_container">
          <h2>Vote for Your Favorite Dishes</h2>
          <div className="dishlist_item">
            {dishes
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((dish) => (
                <Dishes key={dish.id} dish={dish} />
              ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(dishes.length / itemsPerPage))
                )
              }
              disabled={currentPage === Math.ceil(dishes.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DishList;
