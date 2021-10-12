import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const Login = () => {
  // Context
  const { dispatch } = useContext(AuthContext);

  //State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  let history = useHistory();
  const [createUser] = useMutation(USER_CREATE);

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify user
      await auth
        .signInWithEmailAndPassword(email, password)
        // Login the user
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });
          createUser();
          // Redirect to home page
          history.push("/");
        });
    } catch (error) {
      // Show error messages
      console.log("login error", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Handle login with google
  const googleLogin = async () => {
    // Verify user
    await auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      // Login user
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });

      // Send user info to our server mongodb to either update/create
      createUser();

      // Redirect to home page
      history.push("/");
    });
  };

  return (
    <div className="w-50 background round m-auto p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger mt-3 mb-3"
      >
        Login with Google
      </button>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
      />
      <Link className="text-danger float-end" to="/password/forgot">
        Forgot Password
      </Link>
    </div>
  );
};

export default Login;
