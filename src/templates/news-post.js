import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import '../components/shared/all.sass';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
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
      width: 100%;
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

    blockquote {
      background-color: #f5f5f5;
      border-left: 5px solid #dbdbdb;
      padding: 1.25em 1.5em;
      &:not(:last-child) {
        border-bottom: 1em;
      }
    }
  }
`;

export const NewsPostTemplate = ({
  content,
  contentComponent,
  frontMatter,
  helmet,
  title,
  date,
  featuredimage,
  location,
  tags,
  description,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Main>
      {helmet || ''}
      <header>
        <PreviewCompatibleImage className="splash" imageInfo={featuredimage} />
      </header>
      <section className="card">
        <h1 className="news-post__title has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-1-desktop ">
          {title}
        </h1>

        <span className="news-post__date">
          {[location, new Date(date).toLocaleDateString()]
            .filter(Boolean)
            .join('  •  ')}
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

const NewsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <NewsPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      title={post.title}
      date={post.date}
      featuredimage={post.featuredimage}
      location={post.location}
      tags={post.tags}
      description={post.description}
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
