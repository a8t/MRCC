import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import Layout from "../components/shared/Layout";
import NewsRoll from "../components/NewsRoll";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "both-items";

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

const Main = styled.main`
  position: relative;
  top: -8em;
`;

export const NewsIndexPageTemplate = ({ title, image }) => {
  return (
    <React.Fragment>
      <Header>
        <PreviewCompatibleImage
          className="splash"
          alt="MRCC"
          imageInfo={image}
        />
        <section className="has-primary-background">
          <h1 className="has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop">
            {title}
          </h1>
        </section>
      </Header>
      <Main className="news section container content">
        <NewsRoll />
      </Main>
    </React.Fragment>
  );
};

export default ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, image },
    },
  } = data;

  return (
    <Layout>
      <NewsIndexPageTemplate {...{ title, image }} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query NewsIndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "news-index-page" } }) {
      frontmatter {
        title
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
`;
