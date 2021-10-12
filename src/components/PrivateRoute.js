import React, { useContext, useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  // If user is logged in set user in state true
  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  // This function returns the navlinks
  const navLinks = () => (
    <nav className="w-75 m-auto">
      <ul className="nav flex-column font-weight-bold border round">
        <li className="nav-item">
          <Link className="nav-link font-weight-bold" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link font-weight-bold" to="/password/update">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link font-weight-bold" to="/hike/create">
            Hikes
          </Link>
        </li>
      </ul>
    </nav>
  );

  // This function returns the content of the page
  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-2 text-center">{navLinks()}</div>
        <div className="col-md-10 p-5 pt-0">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );

  // If user is logged in render the content else redirect to login page
  return user ? renderContent() : <LoadingToRedirect path="/login" />;
};

export default PrivateRoute;
