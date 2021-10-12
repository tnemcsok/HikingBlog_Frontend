import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const PasswordForgot = () => {
  // State
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle forgoted password request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      // Verify email and send password reset link in email to the user
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          `Email is sent to ${email}. Click on the link to reset your password`
        );
      })
      .catch((error) => {
        // Show error messages
        setLoading(false);
        console.log("error on password forgot email", error);
      });
  };

  return (
    <div className="w-50 background round m-auto p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password </h4>
      )}

      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PasswordForgot;
