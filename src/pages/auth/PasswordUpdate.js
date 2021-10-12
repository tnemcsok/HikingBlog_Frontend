import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const PasswordUpdate = () => {
  // State
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle password update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    auth.currentUser
      // Update password in database
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Passowrd updated");
      })
      .catch((error) => {
        // Show error messages
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="w-75 background round p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Password update</h4>
      )}

      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
        hideEmailInput="true"
      />
    </div>
  );
};

export default PasswordUpdate;
