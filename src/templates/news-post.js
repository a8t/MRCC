import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import Content, { HTMLContent } from '../components/shared/Content';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'both-items';

    .splash {
      grid-area: both-items;
      height: 30vh;
      object-fit: cover;
      object-position: 50% 20%;
    }

    @media screen and (min-width: 1024px) {
      .splash {
        height: 50vh;
        width: 100%;
      }
    }

    .splash {
      z-index: -1;
    }
  }

  .card {
    padding: 8vmin;
    margin: 2vmin;
    margin-top: -10vh;
    margin-bottom: 16px;
    max-width: 50em;

    @media (min-width: 1024px) {
      box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19),
        0 12px 15px 0 rgba(0, 0, 0, 0.24);
      margin: auto;
      margin-top: -30vh;
      margin-bottom: 64px;
    }

    display: flex;
    flex-direction: column;

    .news-post__title {
      line-height: 1.1em;
    }

    .news-post__date {
      margin-left: auto;
      margin-top: 16px;
      margin-bottom: 32px;
      font-style: italic;
    }
  }
`;

export const NewsPostTemplate = ({
  content,
  contentComponent,
  frontMatter,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  const {
    featuredImage,
    title,
    date,
    description,
    featuredpost,
    featuredimage,
    location,
    tags,
  } = frontMatter;

  return (
    <Main>
      {helmet || ''}
      <header>
        <Img className="splash" fluid={featuredimage.childImageSharp.fluid} />
      </header>
      <section className="card">
        <h1 className="news-post__title has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop ">
          {title}
        </h1>

        <span className="news-post__date">
          {[location, date].filter(Boolean).join('  •  ')}
        </span>

        <PostContent className="content" content={content} />

        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </Main>
  );
};

NewsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const NewsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <NewsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        frontMatter={post.frontmatter}
        helmet={
          <Helmet titleTemplate="%s | News">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  );
};

NewsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default NewsPost;

export const pageQuery = graphql`
  query NewsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        location
        featuredimage {
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
