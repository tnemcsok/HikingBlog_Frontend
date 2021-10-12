import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { PROFILE } from "../../graphql/queries";
import { USER_UPDATE } from "../../graphql/mutations";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";

const Profile = () => {
  // State
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("USER UPDATE MUTATION IN PROFILE", data);
      toast.success("Profile updated");
    },
  });

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
    setValues({ ...values, [e.target.name]: e.target.value });
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
        loading={loading}
      />
    </div>
  );
};

export default Profile;
