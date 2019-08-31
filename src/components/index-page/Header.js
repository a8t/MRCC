import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import ButtonLink from '../ButtonLink';

const HeaderContainer = styled.header`
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
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 55, 55, 0.4);
    color: white;
    padding: 3em;
    text-align: center;
    text-wrap: balance;

    h1,
    h2 {
      text-shadow: 4px 4px 6px rgba(55, 12, 12, 0.8);
    }

    h2 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
  }
`;

const Header = ({ image, title, subtitle }) => {
  return (
    <HeaderContainer>
      <Img className="splash" fluid={image.childImageSharp.fluid} alt="MRCC" />

      <section>
        <h1 className="is-size-3-mobile is-size-3-tablet is-size-3-touch is-size-1-desktop is-size-1-widescreen is-size-1-fullhd">
          {title}
        </h1>
        <h2 className="is-size-5-mobile is-size-5-tablet is-size-5-touch is-size-5-desktop is-size-5-widescreen is-size-5-fullhd">
          {subtitle}
        </h2>
        <ButtonLink to="/campaigns">See our campaigns</ButtonLink>
      </section>
    </HeaderContainer>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
    `}
    render={({
      markdownRemark: {
        frontmatter: { title, subtitle, image },
      },
    }) => <Header {...{ title, subtitle, image }} />}
  />
);
