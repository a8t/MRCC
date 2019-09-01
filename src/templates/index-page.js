import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import BlogRoll from '../components/BlogRoll';
import Layout from '../components/shared/Layout';
import ButtonLink from '../components/shared/ButtonLink';
import WhatWeDo from '../components/index-page/WhatWeDo';
import Header from '../components/index-page/Header';

export const IndexPageTemplate = ({ mainpitch, intro }) => (
  <React.Fragment>
    <Header />

    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        style={{
          width: '100%',
          maxWidth: '60rem',
          margin: 'auto',
          padding: 16,
        }}
      >
        <h1 className="title">{mainpitch.title}</h1>
        <h5 className="subtitle">{mainpitch.description}</h5>
      </section>
      <section
        style={{
          width: '100%',
          maxWidth: '60rem',
          margin: 'auto',
          padding: 16,
        }}
      >
        <h1 className="title">{intro.heading}</h1>
        <h5 className="subtitle">{intro.description}</h5>

        <WhatWeDo gridItems={intro.blurbs} />
      </section>
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
  const { heading, mainpitch, description, intro } = frontmatter;

  return (
    <Layout>
      <IndexPageTemplate
        heading={heading}
        description={description}
        intro={intro || { blurbs: [] }}
        mainpitch={mainpitch || {}}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        heading: PropTypes.string,
        mainpitch: PropTypes.object,
        intro: PropTypes.shape({
          blurbs: PropTypes.array,
        }),
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
        intro {
          heading
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }
      }
    }
  }
`;
