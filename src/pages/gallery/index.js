import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Layout from '../../components/shared/Layout';
import Img from 'gatsby-image';
import styled from 'styled-components';

const query = graphql`
  query GalleryIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "gallery-page" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            gallery
            title
            subtitle
            mainPhoto {
              childImageSharp {
                fixed(width: 225) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GalleriesMain = styled.main`
  max-width: 60em;
  margin: auto;
  padding: 8vmin;

  .galleries {
    margin: 0;
    margin-top: 32px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, 225px);
    list-style: none;
    li {
      display: block;
    }
  }
`;

export default function GalleryPage() {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(query);

  return (
    <Layout>
      <GalleriesMain
        className="content"
        style={{ maxWidth: '60em', margin: 'auto', padding: '8vmin' }}
      >
        <h1>Galleries</h1>
        <ul className="galleries">
          {edges.map(
            ({
              node: {
                frontmatter: { gallery, title, subtitle, mainPhoto },
              },
            }) => {
              return (
                <li className="card">
                  <Link to={`/gallery/${gallery}`}>
                    <Img
                      className="card-image"
                      fixed={mainPhoto.childImageSharp.fixed}
                    />
                    <div className="card-content">
                      <p class="title is-4">{title}</p>
                      <p class="subtitle is-6">{subtitle}</p>
                    </div>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </GalleriesMain>
    </Layout>
  );
}
