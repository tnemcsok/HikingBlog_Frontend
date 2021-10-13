import React from "react";

const UserProfile = ({
  handleSubmit,
  handleChange,
  handleDelete,
  username,
  name,
  email,
  about,
  age,
  gender,
  loading,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group mt-3">
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        className="form-control"
        placholder="Username"
        disabled={loading}
      />
    </div>

    <div className="form-group mt-3">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        className="form-control"
        placholder="Name"
        disabled={loading}
      />
    </div>

    <div className="form-group mt-3">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className="form-control"
        placholder="Username"
        disabled
      />
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleChange}
          className="form-control"
          placholder="age"
        />
      </div>
      <div className="col-md-6">
        <label>Gender</label>
        <select
          name="gender"
          value={gender}
          onChange={handleChange}
          className="form-control"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
    </div>

    <div className="form-group mt-3">
      <label>About</label>
      <textarea
        name="about"
        value={about}
        onChange={handleChange}
        className="form-control"
        placholder="Username"
        disabled={loading}
      />
    </div>
    <div className="row">
      <div className="col-md-6">
        <button
          className="btn btn-primary d-block m-auto mt-5"
          type="submit"
          disabled={!email || loading}
        >
          Submit
        </button>
      </div>
      <div className="col-md-6">
        <button
          className="btn btn-danger d-block m-auto mt-5"
          type="button"
          onClick={handleDelete}
          disabled={!email || loading}
        >
          Delete account
        </button>
      </div>
    </div>
  </form>
);

export default UserProfile;
