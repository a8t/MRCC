import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';

export const MissionPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
