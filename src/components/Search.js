import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  // If search is submitted redirect to the matched hikes
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <form className="form-inline searchForm" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="form-control rounded search"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-light" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
