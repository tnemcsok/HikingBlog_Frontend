import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
  // State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };

    // Send signin link to email
    const result = await auth.sendSignInLinkToEmail(email, config);

    // Show toast notification to user about email sent
    toast.success(
      `Email is sent to ${email}. click the link to complete your registration.`
    );

    // Save user email to local storage
    window.localStorage.setItem("emailForRegistration", email);

    // Redirect to home page

    history.push("/");

    // Clear state
    setEmail("");
    setLoading("");
  };

  return (
    <div className="w-50 background round m-auto p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Register</h4>
      )}
      <AuthForm
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
