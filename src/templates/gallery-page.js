import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Layout from '../components/shared/Layout';
import { HTMLContent } from '../components/shared/Content';
import DownArrow from '../components/shared/DownArrow';

const Template = styled.section`
  --content-padding: 16px;

  @media screen and (min-width: 479px) {
    --content-padding: 32px;
  }

  @media screen and (min-width: 1024px) {
    --content-padding: 5vw;
  }

  .gallery-header {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'header-items';
    min-height: 60vh;
    max-height: 500px;

    .gallery-header__splash,
    .gallery-header__overlay,
    .gallery-header__text {
      grid-area: header-items;
    }

    .gallery-header__splash {
      z-index: -1;
      filter: brightness(0.4) blur(5px);
      margin: 2px -10px;
      overflow: hidden;
    }

    .gallery-header__text {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      text-align: left;
      padding: var(--content-padding);

      > * {
        max-width: 35em;
      }

      .gallery-header__description {
        margin-top: 16px;
        p {
          margin: 8px 0;
        }
      }

      @media screen and (min-width: 479px) and (max-width: 1023px) {
        margin-top: -64px;
      }

      @media screen and (min-width: 1024px) {
        padding-top: 88px;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 64px;
        width: 100%;

        .gallery-header__description {
          margin-top: 0px;
        }
      }
    }
  }

  .gallery-arrow__container {
    @media (min-width: 479px) {
      display: none;
    }

    position: relative;
    --gallery-arrow__size: 20;

    .gallery-arrow {
      position: absolute;
      left: calc(50% - var(--gallery-arrow__size) * 1px);

      background: white;
      width: calc(var(--gallery-arrow__size) * 2px);
      height: calc(var(--gallery-arrow__size) * 2px);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      margin-top: calc(var(--gallery-arrow__size) * -1px);
      border-radius: 50%;
      box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19),
        0 12px 15px 0 rgba(0, 0, 0, 0.24);

      z-index: 2;
      .gallery-arrow-svg {
        width: calc(var(--gallery-arrow__size) * 0.8px);
      }
    }
  }

  .gallery-images {
    z-index: 0;
    background: white;
    display: grid;
    gap: 4px;
    grid-template-columns: 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(200px, auto);

    .gallery-image {
      cursor: pointer;
      &:nth-child(3n - 2) {
        grid-column: span 2;
        grid-row: span 1;
      }
    }

    @media (min-width: 479px) {
      padding: 4px;
      box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19),
        0 12px 15px 0 rgba(0, 0, 0, 0.24);
      margin: var(--content-padding);
      margin-top: -64px;
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      grid-auto-flow: dense;
      .gallery-image {
        &:nth-child(8n - 7) {
          grid-column: span 2;
          grid-row: span 2;
        }
      }
    }

    @media screen and (min-width: 1023px) {
      margin-top: -128px;
    }
  }
`;

const GalleryPage = ({ data }) => {
  const {
    markdownRemark: { html, frontmatter },
    allFile: { edges: galleryNodes },
  } = data;

  const {
    title,
    subtitle,
    description,
    tags,
    mainPhoto,
    gallery,
  } = frontmatter;

  const srcSet = galleryNodes.map(
    ({ node }) => node.childImageSharp.original.src
  );
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const nextIndex = (photoIndex + 1) % srcSet.length;
  const prevIndex = (photoIndex + srcSet.length - 1) % srcSet.length;
  const selectImg = index => {
    setPhotoIndex(index);
    setIsOpen(true);
    // set focus here
  };

  return (
    <Layout>
      <Template>
        <Helmet titleTemplate="%s | MRCC Gallery">
          <title>{`${title}`}</title>
          <meta name="description" content={`${description}`} />
          <meta property="og:title" content={`${title} | MRCC Gallery`} />
          <meta property="og:description" content={subtitle} />
          <meta property="og:image" content={mainPhoto.childImageSharp.src} />
          <meta property="og:url" content={`/galleries/${gallery}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="og:site_name"
            content="Migrants Resource Centre Canada"
          />
          <meta name="twitter:image:alt" content={title} />
          <meta name="twitter:site" content="@mrccanada" />
        </Helmet>

        <header className="gallery-header">
          <Img
            className="gallery-header__splash"
            fluid={mainPhoto.childImageSharp.fluid}
            imgStyle={{ objectPosition: '50% 30%' }}
          />
          <div className="gallery-header__overlay has-primary-background"></div>
          <section className="gallery-header__text">
            <div className="gallery-header__description">
              <h1 className="has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-1-desktop ">
                {title}
              </h1>
              <h2 className="is-size-5-mobile is-size-4-tablet is-size-4-desktop">
                {subtitle}
              </h2>
            </div>
            <HTMLContent
              className="gallery-header__description"
              content={html}
            />
          </section>
        </header>

        <div className="gallery-arrow__container">
          <div className="gallery-arrow">
            <DownArrow fill="black" className="gallery-arrow-svg" />
          </div>
        </div>

        <section className="gallery-images card">
          {galleryNodes.map(({ node }, i) => (
            <Img
              key={node.childImageSharp.id}
              className="gallery-image"
              fixed={node.childImageSharp.fixed}
              style={{ width: 'unset', height: 'unset' }}
              onClick={() => selectImg(i)}
            />
          ))}
        </section>

        {isOpen && (
          <Lightbox
            mainSrc={srcSet[photoIndex]}
            nextSrc={srcSet[nextIndex]}
            prevSrc={srcSet[prevIndex]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex(prevIndex)}
            onMoveNextRequest={() => setPhotoIndex(nextIndex)}
          />
        )}

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
            id
            original {
              src
            }
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
