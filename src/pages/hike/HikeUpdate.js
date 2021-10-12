import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SINGLE_HIKE } from "../../graphql/queries";
import { HIKE_UPDATE } from "../../graphql/mutations";
import { useParams } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import SelectCountry from "../../components/SelectCountry";

const HikeUpdate = () => {
  // State
  const [values, setValues] = useState({
    title: "",
    summary: "",
    coverImage: {
      url: "",
      publicId: "",
    },
    country: "",
    region: "",
    content: "",
    images: [],
    difficulty: "",
    distance: 0,
    elevation: 0,
    duration: 0,
  });

  const [loading, setLoading] = useState(false);

  // Lazy query
  const [getSingleHike, { data: singleHike }] = useLazyQuery(SINGLE_HIKE);

  // Hike update mutation
  const [hikeUpdate] = useMutation(HIKE_UPDATE);

  // Get hikeid from params
  const { hikeid } = useParams();

  // Destructure values
  const {
    content,
    title,
    summary,
    distance,
    difficulty,
    elevation,
    duration,
    country,
    region,
  } = values;

  // Delete __typename from image
  const omitTypename = (key, value) =>
    key === "__typename" ? undefined : value;

  // Populate state with the data of the specific hike
  useMemo(() => {
    if (singleHike) {
      setValues({
        ...values,
        _id: singleHike.singleHike._id,
        title: singleHike.singleHike.title,
        coverImage: JSON.parse(
          JSON.stringify(singleHike.singleHike.coverImage),
          omitTypename
        ),
        content: singleHike.singleHike.content,
        summary: singleHike.singleHike.summary,
        country: singleHike.singleHike.country,
        region: singleHike.singleHike.region,
        difficulty: singleHike.singleHike.difficulty,
        distance: singleHike.singleHike.distance,
        elevation: singleHike.singleHike.elevation,
        duration: singleHike.singleHike.duration,
        images: JSON.parse(
          JSON.stringify(singleHike.singleHike.images),
          omitTypename
        ),
      });
    }
  }, [singleHike]);

  // Use the lazy query
  useEffect(() => {
    getSingleHike({ variables: { hikeId: hikeid } });
  }, []);

  // Put the values from the form to state
  const handleChange = (e) => {
    e.preventDefault();
    let { value, name, type } = e.target;
    if (type == "number") value = parseInt(value);
    setValues({ ...values, [name]: value });
  };

  // Update the hike on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    hikeUpdate({ variables: { input: values } });
    setLoading(false);
    toast.success("Hike Updated");
  };

  // Form to update hike
  const updateForm = () => (
    <form onSubmit={handleSubmit}>
      {/* Set title */}
      <div className="form-group">
        <label className="font-weight-bold">Title</label>
        <input
          value={title}
          type="text"
          onChange={handleChange}
          name="title"
          className=" form-control mt-3 mb-3"
          placeholder="Title"
          disabled={loading}
        />
      </div>

      {/* Set summary */}
      <div className="form-group">
        <label className="font-weight-bold">Summary</label>
        <textarea
          value={summary}
          onChange={handleChange}
          name="summary"
          rows="2"
          className="md-textarea form-control mt-3 mb-3"
          placeholder="Write your short summary"
          maxLength="150"
          disabled={loading}
        ></textarea>
      </div>

      {/* Upload cover image */}
      <div className="col-md-6">
        <h6>Cover Image</h6>
        <FileUpload
          values={values}
          loading={loading}
          setValues={setValues}
          setLoading={setLoading}
          singleUpload={true}
        />
      </div>

      {/* Set area */}
      <div className="row">
        {/* Set country */}
        <SelectCountry country={country} handleChange={handleChange} />
        {/* Set region */}
        <div className="col-md-6 p-3">
          <label className="font-weight-bold d-block">Region</label>
          <input
            type="text"
            onChange={handleChange}
            name="region"
            className="d-inline-block form-control mt-3 mb-3 w-50"
            placeholder="Add region"
            value={region}
            disabled={loading}
          />
        </div>
      </div>

      {/* Set description */}
      <div className="form-group">
        <label className="font-weight-bold">Description</label>
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="5"
          className="md-textarea form-control mt-3 mb-3"
          placeholder="Write your deatailed description of your hike"
          disabled={loading}
        ></textarea>
      </div>

      {/* Statistics of hike */}
      <div className="row">
        {/* Difficulty */}
        <div className="form-group col-md-3 p-3">
          <label className="font-weight-bold">Difficulty</label>
          <select
            onChange={handleChange}
            name="difficulty"
            value={difficulty}
            className="form-control mt-3 mb-3"
            disabled={loading}
          >
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="hard">hard</option>
            <option value="expert">expert</option>
          </select>
        </div>

        {/* Distance */}
        <div className="form-group col-md-3 p-3">
          <label className="font-weight-bold d-block">Distance</label>
          <input
            type="number"
            onChange={handleChange}
            value={distance}
            name="distance"
            className="d-inline-block form-control mt-3 mb-3 w-50"
            placeholder="km"
            disabled={loading}
          />
          <p className="d-inline-block p-2">km</p>
        </div>

        {/* Elevation */}
        <div className="form-group col-md-3 p-3">
          <label className="font-weight-bold d-block">Elevation</label>
          <input
            type="number"
            onChange={handleChange}
            name="elevation"
            value={elevation}
            className="d-inline-block form-control mt-3 mb-3 w-50"
            placeholder="m"
            disabled={loading}
          />
          <p className="d-inline-block p-2">m</p>
        </div>

        {/* Duration */}
        <div className="form-group col-md-3 p-3">
          <label className="font-weight-bold d-block">Duration</label>
          <input
            type="number"
            onChange={handleChange}
            name="duration"
            value={duration}
            className="d-inline-block form-control mt-3 mb-3 w-50"
            placeholder="hour"
            disabled={loading}
          />
          <p className="d-inline-block p-2">h</p>
        </div>

        {/* Upload further images */}
        <div className="row">
          <h6>Further Images</h6>
          <FileUpload
            values={values}
            loading={loading}
            setValues={setValues}
            setLoading={setLoading}
            singleUpload={false}
          />
        </div>

        {/* Submit button */}
        <button
          className="btn btn-primary w-25 m-auto mt-3"
          type="submit"
          disabled={loading || !summary || !title}
        >
          Upload
        </button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update</h4>}

      {updateForm()}
    </div>
  );
};

export default HikeUpdate;
