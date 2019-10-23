import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import styled from 'styled-components';

const query = graphql`
  query IntroBlurbsQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        intro {
          heading
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            text
            link
          }
        }
      }
    }
  }
`;

const BlurbsContainer = styled.section`
  position: relative;

  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto;
  grid-template-areas:
    'blurbs blurbs blurbs'
    '   .     .    button';

  .blurb {
    background: #f5f5f5;
    border-radius: 4px 16px;
    padding-top: 16px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 32px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :hover {
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.19),
        0 3px 5px 0 rgba(0, 0, 0, 0.24);
    }

    h3 {
      font-weight: 800;
      padding-bottom: 4px;
    }

    .img-container {
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 980px) {
    grid-gap: 8px;

    .blurb .img-container {
      width: 100px;
      height: 100px;
    }
  }

  @media (max-width: 767px) {
    /* switch to a single column for mobile */
    grid-template-columns: 1fr;
    grid-template-areas: initial;
    margin-bottom: 8px;

    .blurb {
      text-align: center;
      padding: 16px;
      padding-top: 8px;
      border-radius: 4px;

      .img-container {
        width: 80px;
        height: 80px;
      }
    }
  }
`;

const IntroBlurbs = () => {
  const {
    markdownRemark: {
      frontmatter: {
        intro: { blurbs },
      },
    },
  } = useStaticQuery(query);

  return (
    <BlurbsContainer>
      {blurbs.map(({ image, title, text, link }) => (
        <Link to={link} className="card blurb" key={text}>
          <PreviewCompatibleImage
            className="img-container"
            imageInfo={image}
            imgStyle={{ objectFit: 'contain' }}
            alt={text}
          />
          <h3>{title}</h3>
          <p>{text}</p>
        </Link>
      ))}
    </BlurbsContainer>
  );
};

export default IntroBlurbs;
