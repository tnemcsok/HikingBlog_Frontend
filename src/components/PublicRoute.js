import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PublicRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  let history = useHistory();

  // If user is logged in redirect to profile page
  useEffect(() => {
    if (state.user) {
      history.push("profile");
    }
  }, [state.user]);

  // If user is not logged in redirect to profile page
  return (
    <div className="container-fluid p-5">
      <Route {...rest} />
    </div>
  );
};

export default PublicRoute;
