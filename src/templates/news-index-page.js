import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/shared/Layout';
import NewsRoll from '../components/NewsRoll';

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'both-items';

  .splash,
  section {
    grid-area: both-items;
    height: 50vh;
    object-fit: cover;
    object-position: 50% 20%;
  }

  @media screen and (min-width: 1024px) {
    .splash,
    section {
      height: 70vh;
      width: 100%;
    }
  }

  .splash {
    z-index: -1;
    filter: brightness(70%);
  }

  section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;

    h1 {
      padding: 1rem 1em;
    }
  }
`;

export const NewsIndexPageTemplate = ({ title, subtitle, image }) => (
  <React.Fragment>
    <Header>
      <Img className="splash" fluid={image.childImageSharp.fluid} alt="MRCC" />
      <section>
        <h1 className="has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop has-primary-background">
          Latest Stories
        </h1>
      </section>
    </Header>
    <section className="section">
      <div className="container">
        <div className="content">
          <NewsRoll />
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default () => {
  const {
    markdownRemark: {
      frontmatter: { title, subtitle, image },
    },
  } = useStaticQuery(graphql`
    query NewsIndexPageTemplate {
      markdownRemark(frontmatter: { templateKey: { eq: "news-index-page" } }) {
        frontmatter {
          title
          subtitle
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <NewsIndexPageTemplate title={title} subtitle={subtitle} image={image} />
    </Layout>
  );
};
