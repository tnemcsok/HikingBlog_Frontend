import React, { useContext } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Image from "./Image";

const FileUpload = ({
  setValues,
  setLoading,
  values,
  singleUpload = false,
}) => {
  const { state } = useContext(AuthContext);

  // Resize image and upload to cloudinary
  const fileResizeAndUpload = (event) => {
    setLoading(true);
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      // Resize the image with Resizer
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          // Send the image to the server and upload to Cloudinary
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
              { image: uri },
              {
                headers: {
                  authtoken: state.user.token,
                },
              }
            )
            .then((response) => {
              setLoading(false);
              // Setvalues to parent component based on either it is
              // used for single/multiple upload
              if (singleUpload) {
                setValues({ ...values, coverImage: response.data });
              } else {
                const { images } = values;
                setValues({ ...values, images: [...images, response.data] });
              }
            });
        },
        "base64"
      );
    }
  };

  // Delete image
  const handleImageRemove = (id) => {
    setLoading(true);
    // Send the selected image to the server to delete it
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: state.user.token,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        // Setvalues to parent component based on either it is
        // used for single/multiple upload
        if (singleUpload) {
          setValues({
            ...values,
            image: {
              url: "",
              public_id: "",
            },
          });
        } else {
          const { images } = values;
          let filteredImages = images.filter((item) => {
            return item.public_id !== id;
          });
          setValues({ ...values, images: filteredImages });
        }
      });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group mt-3">
          <label className="btn btn-primary mb-3">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={fileResizeAndUpload}
              className="form-control"
              placholder="Image"
            />
          </label>
        </div>
      </div>

      {/* For single image*/}
      {singleUpload && (
        <div className="col-md-6">
          <Image
            image={values.coverImage}
            key={values.coverImage.public_id}
            handleImageRemove={handleImageRemove}
            height="100px"
          />
        </div>
      )}

      {/* For multiple image*/}
      {!singleUpload && (
        <div className="col-md-12">
          {values.images.map((image) => (
            <Image
              image={image}
              key={image.public_id}
              handleImageRemove={handleImageRemove}
              height="100px"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
