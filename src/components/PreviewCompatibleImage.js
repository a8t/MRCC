import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const PreviewCompatibleImage = ({
  imageInfo,
  imgStyle = {},
  className = '',
  ...props
}) => {
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!imageInfo && typeof imageInfo === 'string') {
    return (
      <img
        className={className}
        style={imgStyle}
        src={imageInfo}
        alt={alt}
        {...props}
      />
    );
  }

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        className={className}
        imgStyle={imgStyle}
        fluid={image.childImageSharp.fluid}
        alt={alt}
        {...props}
      />
    );
  }

  return null;
};

export default PreviewCompatibleImage;
