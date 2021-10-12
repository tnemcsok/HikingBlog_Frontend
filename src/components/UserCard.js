import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  // Destructure user
  const { username, images, about } = user;

  return (
    <Link to={`/user/${username}`}>
      <div
        className="d-flex flex-column shadow p-3 text-center background round"
        style={{ minHeight: "425px" }}
      >
        <div className="card-body">
          <Image image={images[0]} height="150px" />

          <h4 className="text-primary mt-2">{username}</h4>

          <hr />
          <p className="text-dark text-justify">{about}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
