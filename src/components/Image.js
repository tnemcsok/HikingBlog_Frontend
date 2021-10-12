import React from "react";

const Image = ({ image, height, handleImageRemove = (f) => f }) => {
  const myStyle = {
    height: height,
    margin: "auto",
  };
  return (
    <img
      src={image.url}
      alt={image.public_id}
      key={image.public_id}
      style={myStyle}
      onClick={() => handleImageRemove(image.public_id)}
    />
  );
};

export default Image;
