import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import BlogRoll from '../components/BlogRoll';
import Layout from '../components/shared/Layout';
import ButtonLink from '../components/shared/ButtonLink';
import IntroBlurbs from '../components/index-page/IntroBlurbs';
import Header from '../components/index-page/Header';

export const IndexPageTemplate = ({ mainpitch }) => (
  <React.Fragment>
    <Header />

    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        style={{
          width: '100%',
          maxWidth: '60rem',
          margin: 'auto',
          padding: 16,
          marginTop: 32,
        }}
      >
        <h1 className="title">{mainpitch.title}</h1>
        <h5 className="subtitle">{mainpitch.description}</h5>
      </section>

      <IntroBlurbs />

      <section
        style={{
          width: '100%',
          maxWidth: '60rem',
          margin: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1 className="title">Latest stories</h1>
        <BlogRoll />
        <ButtonLink to="/blog" style={{ alignSelf: 'center' }}>
          Read more
        </ButtonLink>
      </section>
    </main>
  </React.Fragment>
);

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const { mainpitch } = frontmatter;

  return (
    <Layout>
      <IndexPageTemplate mainpitch={mainpitch || {}} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        heading: PropTypes.string,
        mainpitch: PropTypes.object,
      }),
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainpitch {
          title
          description
        }
      }
    }
  }
`;
