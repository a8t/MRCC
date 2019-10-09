import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = styled.main`
  margin: auto;
  padding: 8vmin 8vmin;
  width: 100%;
  max-width: 60em;

  .all-staff {
    margin-bottom: 64px;

    .staff-card {
      margin-bottom: 32px;
      display: grid;
      gap: 16px;
      grid-template-rows: auto;
      grid-template-columns: 200px 1fr;
      grid-template-areas: 'img info';

      @media (max-width: 600px) {
        grid-template-areas:
          'img'
          'info';

        grid-template-rows: auto;
        grid-template-columns: 1fr;
      }

      .staff-card__image {
        grid-area: img;
      }

      .staff-card__info {
        padding: 16px;
        display: block;
        grid-area: info;
      }
    }
  }
`;

export const TeamPageTemplate = ({
  content,
  contentComponent,
  frontmatter,
}) => {
  const { title, staff } = frontmatter;
  const PageContent = contentComponent || Content;
  return (
    <Main>
      <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
        {title}
      </h2>
      <section className="all-staff">
        {staff.map(({ image, name, title, text, email }) => (
          <article className="staff-card card">
            <PreviewCompatibleImage
              className="staff-card__image"
              imageInfo={image}
            />
            <section className="staff-card__info">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{title}</p>
              <p className="content">{text}</p>
              <a href={`mailto:${email}`}>{email}</a>
            </section>
          </article>
        ))}
      </section>
      <PageContent className="content" content={content} />
    </Main>
  );
};

const TeamPage = ({ data }) => {
  const {
    markdownRemark: { html, frontmatter },
  } = data;

  return (
    <Layout>
      <TeamPageTemplate
        contentComponent={HTMLContent}
        content={html}
        frontmatter={frontmatter}
      />
    </Layout>
  );
};

TeamPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TeamPage;

export const teamPageQuery = graphql`
  query TeamPage {
    markdownRemark(frontmatter: { templateKey: { eq: "team-page" } }) {
      html
      frontmatter {
        title
        staff {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          title
          text
          email
        }
      }
    }
  }
`;
