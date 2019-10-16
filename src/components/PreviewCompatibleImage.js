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

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        imgStyle={imgStyle}
        fluid={image.childImageSharp.fluid}
        alt={alt}
        {...props}
      />
    );
  }

  if (!!childImageSharp) {
    return (
      <Img
        className={className}
        imgStyle={imgStyle}
        fluid={childImageSharp.fluid}
        alt={alt}
        {...props}
      />
    );
  }

  if (!!image && typeof image === 'string')
    return <img className={className} style={imgStyle} src={image} alt={alt} />;

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
