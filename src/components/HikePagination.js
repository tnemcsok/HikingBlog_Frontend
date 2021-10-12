import React from "react";

const HikePagination = ({ page, setPage, hikeCount }) => {
  let totalPages;

  // Pagination function returns the available pages as links
  const pagination = () => {
    // Calculate the total number of pages
    totalPages = Math.ceil(hikeCount && hikeCount.totalHikes / 3);

    // If total number of pages is greater than ten show only the first ten
    if (totalPages > 10) totalPages = 10;

    // Push each page as a link to the pages array
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li>
          <a
            className={`page-link ${page === i && "activePagination"}`}
            onClick={() => setPage(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li>
          <a
            className={`page-link ${page === 1 && "disabled"}`}
            onClick={() => {
              let newPage = page - 1 <= 1 ? 1 : page - 1;
              setPage(newPage);
            }}
          >
            Previous
          </a>
        </li>
        {pagination()}
        <li>
          <a
            className={`page-link ${page === totalPages && "disabled"}`}
            onClick={() => {
              let nextpage = page + 1 >= totalPages ? totalPages : page + 1;
              setPage(nextpage);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HikePagination;
