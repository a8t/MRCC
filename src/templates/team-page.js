import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

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
      padding: 16px;
      gap: 16px;
      grid-template-rows: auto;
      grid-template-columns: 1fr;
      grid-template-areas:
        'img'
        'info'
        'description-paragraph';

      @media (min-width: 600px) {
        padding: 32px;
        gap: 32px;
        grid-template-areas:
          'img                    info'
          'description-paragraph  description-paragraph';

        grid-template-rows: auto;
        grid-template-columns: 1fr;
      }

      @media (min-width: 900px) {
        padding: 32px;
        gap: 32px;
        grid-template-areas:
          'img     description-paragraph'
          'info    description-paragraph';

        grid-template-rows: 250px;
        grid-template-columns: 250px 1fr;
      }

      .staff-card__image {
        grid-area: img;
        height: 250px;
        width: 100%;
      }

      .staff-card__description {
        grid-area: description-paragraph;
        white-space: pre-wrap;
      }

      .staff-card__info {
        grid-area: info;
        display: flex;
        flex-direction: column;
      }

      .staff-card__email {
        /* margin-top: auto; */
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
              <a className="staff-card__email" href={`mailto:${email}`}>
                {email}
              </a>
            </section>
            <p className="content staff-card__description">{text}</p>
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
