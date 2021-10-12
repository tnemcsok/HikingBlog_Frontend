import React from "react";
import Image from "./Image";
import { Link, useHistory } from "react-router-dom";

const HikeCard = ({
  hike,
  handleDelete = (f) => f,
  showUpdateButton = false,
  showDeleteButton = false,
}) => {
  const history = useHistory();
  const {
    coverImage,
    title,
    summary,
    postedBy,
    difficulty,
    distance,
    duration,
    country,
    region,
  } = hike;

  return (
    <div
      className="d-flex flex-column shadow p-3 text-center background round"
      style={{ minHeight: "475px" }}
    >
      <h4 className="text-primary mt-2 mb-3 aclonica">{title}</h4>
      <Link to={`/hike/${hike._id}`}>
        <Image image={coverImage} height="100px" />
      </Link>
      <h6 className="text-primary mt-2">@{postedBy.username}</h6>
      <div className="d-flex justify-content-around">
        <p className="font-weight-bold">{country + " (" + region + ")"}</p>
      </div>
      <hr className="mt-0" />

      <div className="d-flex flex-column justify-content-between flex-grow-1 ps-3 pe-3 text-justify">
        <p>{summary}</p>
        <div className="d-flex justify-content-around">
          <p>
            <i className="fas fa-dumbbell text-primary"></i>: {difficulty}
          </p>
          <p>
            <i className="fas fa-route text-primary"></i>: {distance + " km"}
          </p>
          <p>
            <i className="far fa-clock text-primary"></i>: {duration + " h"}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        {showDeleteButton && (
          <button
            onClick={() => handleDelete(hike._id)}
            className="btn m-2 btn-danger"
          >
            Delete
          </button>
        )}
        {showUpdateButton && (
          <button
            onClick={() => history.push(`/hike/update/${hike._id}`)}
            className="btn m-2 btn-warning"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default HikeCard;
