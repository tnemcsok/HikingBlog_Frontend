import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import FileUpload from "../../components/FileUpload";
import { HIKE_CREATE, HIKE_DELETE } from "../../graphql/mutations";
import { HIKES_BY_USER } from "../../graphql/queries";
import HikeCard from "../../components/HikeCard";
import SelectCountry from "../../components/SelectCountry";

const initialState = {
  title: "",
  summary: "",
  coverImage: {
    url: "",
    publicId: "",
  },
  country: "",
  region: "",
  images: [],
  difficulty: "",
  distance: 0,
  elevation: 0,
  duration: 0,
};

const Hike = () => {
  // State
  const [values, setValues] = useState(initialState);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Destructure values
  const { summary, title, content } = values;

  // Query hikes of the user
  const { data: hikes } = useQuery(HIKES_BY_USER);

  // Mutations
  const [hikeCreate] = useMutation(HIKE_CREATE);

  const [hikeDelete] = useMutation(HIKE_DELETE, {
    update: ({ data }) => {
      console.log("Hike DELETE MUTATION", data);
      toast.error("Hike deleted");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Hike delete failed");
    },
  });

  // Handle hike delete
  const handleDelete = async (hikeId) => {
    // Confirm delete
    let answer = window.confirm("Delete?");

    // Delete hike
    if (answer) {
      setLoading(true);
      hikeDelete({
        variables: { hikeId },
        refetchQueries: [{ query: HIKES_BY_USER }],
      });
      setLoading(false);
    }
  };

  // Handle hike upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    hikeCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success("Hike created");
  };

  // Put values from the form to state
  const handleChange = (e) => {
    e.preventDefault();
    let { value, name, type } = e.target;
    if (type == "number") value = parseInt(value);
    setValues({ ...values, [name]: value });
  };

  // Form to upload new hike
  const createForm = () => (
    <form
      onSubmit={handleSubmit}
      className="background round p-5 w-90 position-relative"
    >
      {/* Close button */}
      <button type="button" className="closeBtn" onClick={() => setShow(false)}>
        x
      </button>

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
        <SelectCountry handleChange={handleChange} />
        {/* Set region */}
        <div className="col-md-6 p-3">
          <label className="font-weight-bold d-block">Region</label>
          <input
            type="text"
            onChange={handleChange}
            name="region"
            className="d-inline-block form-control mt-3 mb-3 w-50"
            placeholder="Add region"
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
    <div className="container">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <button className="btn btn-primary" onClick={() => setShow(true)}>
          Upload hike
        </button>
      )}

      {/* Form to upload new hike */}
      <div className={"row mt-4 " + (show ? "show" : "hide")}>
        <div className="row">{createForm()}</div>
      </div>
      <hr />

      {/* Hikes of the user. Here the user can edit the hikes. */}
      <div className="row p-5">
        {hikes &&
          hikes.hikesByUser.map((hike) => (
            <div className="col-md-6 pt-5" key={hike._id}>
              <HikeCard
                hike={hike}
                handleDelete={handleDelete}
                showUpdateButton={true}
                showDeleteButton={true}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hike;
