import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const PreviewCompatibleImage = ({
  imageInfo,
  imgStyle = {},
  className = "",
  ...props
}) => {
  if (!!imageInfo && typeof imageInfo === "string") {
    return (
      <img className={className} style={imgStyle} src={imageInfo} {...props} />
    );
  }

  if (!imageInfo.childImageSharp) {
    return null;
  }

  return (
    <Img
      className={className}
      imgStyle={imgStyle}
      fluid={imageInfo?.childImageSharp?.fluid}
      {...props}
    />
  );
};

export default PreviewCompatibleImage;
