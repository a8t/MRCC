import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';

const Main = styled.main`
  margin: auto;
  width: 100%;

  header {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'both-items';

    .splash,
    section {
      grid-area: both-items;
      height: 30vh;
      object-fit: cover;
      object-position: 50% 20%;
    }

    @media screen and (min-width: 1024px) {
      .splash,
      section {
        height: 50vh;
        width: 100%;
      }
    }

    .splash {
      z-index: -1;
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
  }

  .card {
    padding: 8vmin;
    margin: 2vmin;
    margin-top: -32px;
    margin-bottom: 16px;

    max-width: 45em;
    @media (min-width: 46em) {
      box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19),
        0 12px 15px 0 rgba(0, 0, 0, 0.24);
      margin: auto;
      margin-top: -8vmin;
      margin-bottom: 64px;
    }
  }
`;

export const MissionPageTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <Main>
      <header>
        <Img className="splash" fluid={image.childImageSharp.fluid} />
        <section>
          <h1 className="has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop has-primary-background">
            {title}
          </h1>
        </section>
      </header>
      <section className="card">
        <PageContent className="content" content={content} />
      </section>
    </Main>
  );
};

const MissionPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <MissionPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  );
};

MissionPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MissionPage;

export const missionPageQuery = graphql`
  query MissionPage {
    markdownRemark(frontmatter: { templateKey: { eq: "mission-page" } }) {
      html
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
