import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { PROFILE } from "../../graphql/queries";
import { USER_UPDATE, USER_DELETE } from "../../graphql/mutations";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/authContext";
import firebase from "firebase";
import { auth } from "../../firebase";
import { GET_ALL_HIKES } from "../../graphql/queries";

const Profile = () => {
  // State
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    age: 0,
    gender: "male",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const { data } = useQuery(PROFILE);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("USER UPDATE MUTATION IN PROFILE", data);
      toast.success("Profile updated");
    },
  });
  const [userDelete] = useMutation(USER_DELETE);

  //Remove __typename from image object
  const omitTypename = (key, value) =>
    key === "__typename" ? undefined : value;

  useMemo(() => {
    if (data) {
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: JSON.parse(JSON.stringify(data.profile.images), omitTypename),
      });
    }
  }, [data]);

  // Update user info
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({
      variables: {
        input: values,
      },
    });
    setLoading(false);
  };

  // Put the values in the form to state
  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
      console.log(value);
    }
    setValues({ ...values, [name]: value });
  };

  // Handle logout
  const logout = async () => {
    await firebase.auth().signOut();
    dispatch({
      type: "LOGGED_IN_USER",
      payload: null,
    });
    history.push("/login");
  };

  // Delete the user
  const handleDelete = (e) => {
    // Confirm delete
    let answer = window.confirm("Are you sure you want to delete user?");

    if (answer) {
      userDelete();
      auth.currentUser
        // Delete user
        .delete()
        .then(() => {
          toast.success("User deleted");
        })
        .catch((error) => {
          // Show error messages
          toast.error(error.message);
        });
      logout();
    }
  };

  return (
    <div className=" p-5 background round w-75 mb-5">
      <div className="row">
        <div className="col-md-12 pb-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h2 className="text-center text-dark">Profile</h2>
          )}
        </div>
        {/* Upload image of the user */}
        <FileUpload
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
        />
      </div>
      {/* Form to update user info */}
      <UserProfile
        {...values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
