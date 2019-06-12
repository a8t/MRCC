import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = ({
  image,
  title,
  subtitle,
  mainpitch,
  intro,
}) => (
  <React.Fragment>
    <header
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `bottom`,

        // backgroundPosition: `top center`,
        // backgroundAttachment: 'fixed',
        // backgroundSize: 'auto',
        // backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            backgroundColor: 'rgba(0, 68, 68, 0.7)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            backgroundColor: 'rgba(0, 68, 68, 0.7)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subtitle}
        </h3>
      </div>
    </header>
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

        <Features gridItems={intro.blurbs} />
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
        <Link className="btn" to="/blog" style={{ alignSelf: 'center' }}>
          Read more
        </Link>
      </section>
    </main>
  </React.Fragment>
);

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const {
    image,
    title,
    heading,
    subtitle,
    mainpitch,
    description,
    intro,
  } = frontmatter;

  return (
    <Layout>
      <IndexPageTemplate
        image={image}
        title={title}
        heading={heading}
        subtitle={subtitle}
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
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        title: PropTypes.string,
        heading: PropTypes.string,
        subtitle: PropTypes.string,
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
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
