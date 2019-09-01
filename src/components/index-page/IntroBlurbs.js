import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
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
          }
        }
      }
    }
  }
`;

const BlurbsContainer = styled.section`
  /* centers the grid on the page */
  margin: auto;
  max-width: 60rem;
  padding: 16px;
  position: relative;

  /* creates a grid with 3 columns */
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;

  .blurb {
    background: rgba(0, 55, 55, 0.05);
    border-radius: 16px 48px;
    padding-top: 16px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 32px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

  @media (max-width: 767px) {
    grid-gap: 16px;
    grid-template-columns: 1fr;

    .blurb {
      text-align: center;
      padding: 15px;
      padding-top: 5px;
      border-radius: 5px;
    }
  }
`;

const IntroBlurbs = () => {
  const {
    markdownRemark: {
      frontmatter: {
        intro: { blurbs, heading },
      },
    },
  } = useStaticQuery(query);

  return (
    <BlurbsContainer>
      {blurbs.map(({ image, title, text }) => (
        <div className="blurb" key={text}>
          <Img
            className="img-container"
            fluid={image.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain' }}
            alt={text}
          />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </BlurbsContainer>
  );
};

export default IntroBlurbs;
