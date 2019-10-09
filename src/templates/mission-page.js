import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';

const Main = styled.main`
  margin: auto;
  padding: 8vmin 8vmin;
  width: 100%;
  max-width: 60em;
`;
export const MissionPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <Main>
      <section>
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
          {title}
        </h2>
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
      }
    }
  }
`;
