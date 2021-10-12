import React, { useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import firebase from "firebase/app";
import Search from "./Search";

const Nav = () => {
  // Get the state from AuthContext
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory();

  // Destructure the user from state
  const { user } = state;

  // Handle logout
  const logout = async () => {
    await firebase.auth().signOut();
    dispatch({
      type: "LOGGED_IN_USER",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <nav className="bg-primary p-2">
      <div className="w-90 m-auto font-weight-bold d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <li className="d-inline-block me-4">
            <i class="fas fa-mountain fs-2 text-light"></i>
          </li>
          <li className="d-inline-block me-3">
            <Link className="text-light" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="d-inline-block me-3">
            <Link className="text-light" aria-current="page" to="/users">
              Users
            </Link>
          </li>
          {/* If user is not logged in show login and register */}
          {!user && (
            <Fragment>
              <li className="d-inline-block me-3">
                <Link className="text-light" to="/login">
                  Login
                </Link>
              </li>
              <li className="d-inline-block me-3">
                <Link className="text-light" to="/register">
                  Register
                </Link>
              </li>
            </Fragment>
          )}
          {/* If user is logged in show profile and logout */}
          {user && (
            <Fragment>
              <li className="d-inline-block me-3">
                <a href="/profile" className="text-light">
                  Profile
                </a>
              </li>
              <li className="d-inline-block me-3">
                <a onClick={logout} href="/login" className="text-light">
                  Logout
                </a>
              </li>
            </Fragment>
          )}
        </div>
        <div className="">
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
