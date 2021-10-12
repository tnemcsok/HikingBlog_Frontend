import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import HikeCard from "../components/HikeCard";
import { PUBLIC_PROFILE, HIKES_BY_OTHER_USER } from "../graphql/queries";

const SingleUser = () => {
  // Get params
  let params = useParams();
  console.log("params", params);

  // Queries
  const { loading: load1, data } = useQuery(PUBLIC_PROFILE, {
    variables: { username: params.username },
  });
  const { loading: load2, data: hikes } = useQuery(HIKES_BY_OTHER_USER, {
    variables: { username: params.username },
  });

  if (load1 || load2) return <p className="p-5"></p>;

  return (
    <div className="m-auto mt-5 p-5 w-75 round shadow">
      {/* Username */}
      <h2 className="font-weight-bold text-center text-primary mb-3">
        {data && data.publicProfile.username}
      </h2>

      {/* Introduction */}
      <div className="row">
        <div className="col-md-6 p-3 border background round">
          <h4 className="font-weight-bold text-center mb-2">Introduction</h4>
          <p className="p-3 text-justify text-dark">
            {data && data.publicProfile.about}
          </p>
        </div>
        <div className="col-md-3">
          <img
            src={data && data.publicProfile.images[0].url}
            alt={data && data.publicProfile.images[0].public_id}
            key={data && data.publicProfile.images[0].public_id}
            style={{ display: "block", margin: "10px auto", height: "200px" }}
          />
        </div>

        {/* Info */}
        <div className="col-md-3 p-3 border background round text-dark">
          <h4 className="font-weight-bold text-center mb-2">Info</h4>
          <p>Name: {data && data.publicProfile.name}</p>
          <p>Age: 30</p>
          <p>Gender: Male</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="row">
        <h4 className="font-weight-bold mt-4 mb-4 text-primary">Statistics</h4>
        <div className="row w-75 m-auto p-3 font-weight-bold text-dark border background round">
          <div className="col-md-6">
            <p>Total hikes: {hikes && hikes.hikesByOtherUser.length}</p>
            <p>
              Total distance:{" "}
              {hikes &&
                hikes.hikesByOtherUser.reduce((total, hike) => {
                  return total + hike.distance;
                }, 0)}{" "}
              km
            </p>
          </div>
          <div className="col-md-6">
            <p>
              Total elevation:{" "}
              {hikes &&
                hikes.hikesByOtherUser.reduce((total, hike) => {
                  return total + hike.elevation;
                }, 0)}{" "}
              m
            </p>
            <p>
              Total hiked time:{" "}
              {hikes &&
                hikes.hikesByOtherUser.reduce((total, hike) => {
                  return total + hike.duration;
                }, 0)}{" "}
              hour
            </p>
          </div>
        </div>
      </div>

      {/* Hikes of the user */}
      <div className="row">
        <h4 className="font-weight-bold mt-2 text-primary">My Hikes</h4>
        {hikes &&
          hikes.hikesByOtherUser.map((hike) => (
            <div className="col-md-6" key={hike._id}>
              <div className="p-3">
                <HikeCard
                  hike={hike}
                  showUpdateButton={false}
                  showDeleteButton={false}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SingleUser;
