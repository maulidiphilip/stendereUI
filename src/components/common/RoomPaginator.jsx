import React from "react";

// this page will be used to paginate the rooms in our browser
const RoomPaginator = ({ currentPage, totalpages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalpages }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination, justify-content-center ">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : " "
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RoomPaginator;
