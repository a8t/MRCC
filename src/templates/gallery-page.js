import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';

const Template = styled.section`
  .gallery-images {
    margin-top: 64px;
    display: grid;
    gap: 4px;
    grid-template-columns: 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(200px, auto);

    .gallery-image:nth-child(3n - 2) {
      grid-column: span 2;
      grid-row: span 1;
    }

    @media (min-width: 479px) {
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      grid-auto-flow: dense;
      .gallery-image:nth-child(4n - 3) {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'both-items';

  .splash,
  .header-text {
    grid-area: both-items;
    height: 50vh;
    object-fit: cover;
    object-position: 50% 20%;
  }

  @media screen and (min-width: 1024px) {
    .splash,
    .header-text {
      height: 70vh;
      width: 100%;
    }
  }

  .splash {
    z-index: -1;
    filter: brightness(0.7);
  }

  .header-text {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: left;
    padding: 32px;

    > * {
      max-width: 40em;
    }

    .description {
      margin-top: 16px;
      p {
        margin: 8px 0;
      }
    }
  }
`;

const GalleryPage = ({ data }) => {
  const {
    markdownRemark: { html, frontmatter },
    allFile: { edges: galleryNodes },
  } = data;

  const { title, subtitle, description, tags, mainPhoto } = frontmatter;

  return (
    <Layout>
      <Template className="section">
        <Helmet titleTemplate="%s | Gallery">
          <title>{`${title}`}</title>
          <meta name="description" content={`${description}`} />
        </Helmet>

        <Header>
          <Img className="splash" fluid={mainPhoto.childImageSharp.fluid} />
          <section className="header-text has-primary-background">
            <div>
              <h1 className="has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop ">
                {title}
              </h1>
              <h2 className="is-size-6-mobile is-size-4-tablet is-size-4-desktop">
                {subtitle}
              </h2>
              <HTMLContent className="description" content={html} />
            </div>
          </section>
        </Header>

        <section className="gallery-images">
          {galleryNodes.map(({ node }) => (
            <Img
              className="gallery-image"
              fixed={node.childImageSharp.fixed}
              style={{ width: 'unset', height: 'unset' }}
            />
          ))}
        </section>

        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Template>
    </Layout>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default GalleryPage;

export const pageQuery = graphql`
  query GalleryByID($id: String!, $gallery: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        gallery
        title
        subtitle
        mainPhoto {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 500, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        tags
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "galleries" }
        relativeDirectory: { eq: $gallery }
      }
      sort: { fields: base, order: ASC }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 500, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
