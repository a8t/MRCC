import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

const MissionPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {post.frontmatter.title}
                </h2>
                <HTMLContent className="content" content={post.html} />
              </div>
            </div>
          </div>
        </div>
      </section>
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
