import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import NewsRoll from "../components/NewsRoll";
import Layout from "../components/shared/Layout";
import ButtonLink from "../components/shared/ButtonLink";
import Header from "../components/index-page/Header";
import IntroBlurbs from "../components/index-page/IntroBlurbs";

export const IndexPageTemplate = ({
  mainpitch,
  title,
  subtitle,
  heroImage,
  intro,
}) => (
  <React.Fragment>
    <Header title={title} subtitle={subtitle} heroImage={heroImage} />

    <main style={{ display: "flex", flexDirection: "column" }}>
      <section
        style={{
          width: "100%",
          maxWidth: "60rem",
          margin: "auto",
          padding: 16,
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="subtitle">{mainpitch.description}</h1>
        <IntroBlurbs blurbs={intro.blurbs} />
        <ButtonLink to="/mission" style={{ alignSelf: "center" }}>
          Our mission
        </ButtonLink>
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: "60rem",
          margin: "auto",
          marginTop: 16,
          marginBottom: 32,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="title">Latest stories</h1>
        <NewsRoll isHomeScreen />
        <ButtonLink to="/news" style={{ alignSelf: "center" }}>
          Read more
        </ButtonLink>
      </section>
    </main>
  </React.Fragment>
);

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <IndexPageTemplate {...data.markdownRemark.frontmatter} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        heading: PropTypes.string,
        mainpitch: PropTypes.object,
      }),
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainpitch {
          title
          description
        }
        title
        subtitle
        heroImage: image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
