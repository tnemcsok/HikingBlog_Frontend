import React from "react";

const AuthForm = ({
  email = "",
  password = "",
  loading,
  setEmail = (f) => f,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
  hideEmailInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    {!hideEmailInput && (
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter email"
          disabled={loading}
        />
      </div>
    )}

    {/* Show password inout only if necessary */}
    {showPasswordInput && (
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter password"
          disabled={loading}
        />
      </div>
    )}

    <button className="btn btn-raised btn-primary mt-3" disabled={loading}>
      Submit
    </button>
  </form>
);

export default AuthForm;
