import React, { useState, useMemo, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { SINGLE_HIKE } from "../../graphql/queries";
import { Link, useParams } from "react-router-dom";
import Image from "../../components/Image";
import Resizer from "react-image-file-resizer";

const SingleHike = () => {
  // State
  const [values, setValues] = useState({
    _id: "",
    title: "",
    summary: "",
    coverImage: {
      url: "",
      publicId: "",
    },
    images: [],
    difficulty: "",
    distance: 0,
    elevation: 0,
    duration: 0,
    postedBy: {
      _id: "",
      username: "",
    },
  });

  // Lazy query
  const [getSingleHike, { data: singleHike }] = useLazyQuery(SINGLE_HIKE);

  // Get hikeid from params
  const { hikeid } = useParams();

  // Populate state with data from lazy query
  useMemo(() => {
    if (singleHike) {
      setValues({
        ...values,
        _id: singleHike.singleHike._id,
        title: singleHike.singleHike.title,
        coverImage: singleHike.singleHike.coverImage,
        content: singleHike.singleHike.content,
        summary: singleHike.singleHike.summary,
        difficulty: singleHike.singleHike.difficulty,
        distance: singleHike.singleHike.distance,
        elevation: singleHike.singleHike.elevation,
        duration: singleHike.singleHike.duration,
        images: singleHike.singleHike.images,
        postedBy: singleHike.singleHike.postedBy,
      });
    }
  }, [singleHike]);

  // Destructure values
  const {
    _id,
    title,
    coverImage,
    content,
    summary,
    difficulty,
    distance,
    duration,
    elevation,
    postedBy,
    images,
  } = values;

  // Call the lazy query on render
  useEffect(() => {
    getSingleHike({ variables: { hikeId: hikeid } });
  }, []);

  return (
    <div className="w-75 p-5 background round m-auto mt-4 mb-4 clearfix">
      <div className="container">
        <div className="row">
          {/* Summary */}
          <div className="col-md-6 text-center">
            <h2 className="text-primary mt-2 aclonica">{title}</h2>
            <Link to={`/user/${postedBy.username}`}>
              <h6 className="text-primary">@{postedBy.username}</h6>
            </Link>
            <hr />
            <p>{summary}</p>
          </div>

          {/* Cover image */}
          <div className="col-md-6">
            <div className="p-5">
              <Image image={coverImage} height="150px" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-3">
        <div className="shadow p-4 m-auto round bg-light">
          <h4 className="font-weight-bold mb-3">Overview</h4>
          <div className="container">
            <div className="row font-weight-bold">
              <div className="col-md-4">
                <div>
                  <i className="fas fa-dumbbell text-primary"></i>
                  <p className="d-inline-block p-2">Difficulty: {difficulty}</p>
                </div>
                <div>
                  <i className="fas fa-route text-primary"></i>
                  <p className="d-inline-block p-2">
                    Distance: {distance + " km"}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <i className="fas fa-mountain text-primary"></i>
                  <p className="d-inline-block p-2">
                    Elevation: {elevation + " m"}
                  </p>
                </div>
                <div>
                  <i className="far fa-clock text-primary"></i>
                  <p className="d-inline-block p-2">
                    Duration: {duration + " hour"}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <i className="fas fa-wrench text-primary"></i>
                  <p className="d-inline-block p-2">Equipment: no need</p>
                </div>
                <div>
                  <i className="fas fa-hiking text-primary"></i>
                  <p className="d-inline-block p-2">Type: hiking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>

        {/* Description */}
        <div className="p-3 mr-3 text-justify">
          <h4 className="font-weight-bold mb-3">Desription</h4>
          <p>{content}</p>
        </div>
      </div>

      {/* Pictures */}
      <div className="p-3">
        <h4 className="font-weight-bold">Pictures</h4>
        <div className="col-md-12">
          {images.length ? (
            images.map((image) => (
              <Image image={image} key={image.public_id} height="100px" />
            ))
          ) : (
            <p>No further images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleHike;
