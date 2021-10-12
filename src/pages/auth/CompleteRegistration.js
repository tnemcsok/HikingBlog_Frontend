import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_CREATE } from "../../graphql/mutations";
import AuthForm from "../../components/forms/AuthForm";

const CompleteRegistration = () => {
  // Context
  const { dispatch } = useContext(AuthContext);

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  const [createUser] = useMutation(USER_CREATE);

  // Autofill email from local storage
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);

      if (result.user.emailVerified) {
        // Remove email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // Finish registration. Log in the user. Redirect to home page
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
        createUser();
        history.push("/profile");
      }
    } catch (error) {
      // Show error messages
      console.log("register complete error", error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Register</h4>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
      />
    </div>
  );
};

export default CompleteRegistration;
