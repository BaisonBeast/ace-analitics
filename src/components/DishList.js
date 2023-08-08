import React, {useContext, useState} from "react";

import Dishes from "./Dishes";
import ErrorComponent from "../components/Error";
import { UserContext } from "../contexts/UserContext";

function DishList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { dishes, loading, error } = useContext(UserContext);
  

  return (
    <div className="dishlist">
      {error ? (
        <ErrorComponent errorCode={error.code} errorMessage={error.message} />
      ) : loading ? (
        <div className="skeleton-loading">
          <div className="skeleton-loading-header" />
          <div className="dishlist_item">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div key={index} className="skeleton-loading-dish" />
            ))}
          </div>

          <div className="skeleton-loading-pagination" />
        </div>
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
                  Math.min(
                    prev + 1,
                    Math.ceil(dishes.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(dishes.length / itemsPerPage)
              }
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
