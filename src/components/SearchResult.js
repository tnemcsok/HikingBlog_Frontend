import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../graphql/queries";
import HikeCard from "../components/HikeCard";

const SearchResult = () => {
  // Get the query from params
  const { query } = useParams();

  // Query the database for the fike
  const { data, loading } = useQuery(SEARCH, {
    variables: { query },
  });

  if (loading)
    return (
      <div className="container text-center">
        <p className="text-danger p-5">Loading...</p>
      </div>
    );

  //If there is no search result
  if (!data.search.length)
    return (
      <div className="container text-center">
        <p className="text-danger p-5">No results..</p>
      </div>
    );

  // If there is search result return the matched hikes
  return (
    <div className="container">
      <div className="row pb-5">
        <h4 className="mt-5">Search result</h4>
        {data.search.map((hike) => (
          <div className="col-md-4 pt-5" key={hike._id}>
            <HikeCard hike={hike} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
