import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import ButtonLink from '../shared/ButtonLink';

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

    filter: brightness(70%);
  }

  section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background: rgba(0, 55, 55, 0.4);
    color: white;
    padding-top: 1em;
    padding-bottom: 2em;
    text-align: center;

    h1,
    h2 {
      width: 100%;
      padding: 0.5em 1em;
    }

    h1 {
      background: rgba(0, 55, 55, 0.3);
    }

    h2 {
      margin-top: 1.5em;
      margin-bottom: 0.2em;
    }
  }
`;

const query = graphql`
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
`;

export default function Header() {
  const {
    markdownRemark: {
      frontmatter: { title, subtitle, image },
    },
  } = useStaticQuery(query);

  return (
    <HeaderContainer>
      <Img className="splash" fluid={image.childImageSharp.fluid} alt="MRCC" />

      <section>
        <h1 className="is-size-5-mobile is-size-3-tablet is-size-1-desktop">
          {title}
        </h1>
        <h2 className="is-size-6-mobile is-size-4-tablet is-size-4-desktop">
          {subtitle}
        </h2>
        <ButtonLink to="/campaigns" isInverted>
          See our campaigns →
        </ButtonLink>
      </section>
    </HeaderContainer>
  );
}
