import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

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

const IntroBlurbs = () => {
  const {
    markdownRemark: {
      frontmatter: {
        intro: { blurbs, heading },
      },
    },
  } = useStaticQuery(query);

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '60rem',
        margin: 'auto',
        padding: 16,
      }}
    >
      <h1 className="title">{heading}</h1>

      <div className="columns is-multiline">
        {blurbs.map(({ image, title, text }) => (
          <div key={text} className="column is-6">
            <div className="has-text-centered">
              <div
                style={{
                  width: '240px',
                  display: 'inline-block',
                }}
              >
                <Img fluid={image.childImageSharp.fluid} alt={text} />
              </div>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroBlurbs;
