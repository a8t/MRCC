import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery, useStaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import _ from "lodash";

export default function NewsRoll({ isHomeScreen = false }) {
  const data = useStaticQuery(graphql`
    query NewsRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "news-post" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 120, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.slice(0, isHomeScreen ? 2 : -1).map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <article
              className={`news-list-item tile is-child box notification`}
            >
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={post.frontmatter.featuredimage}
                    />
                  </div>
                ) : null}
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="subtitle is-size-5 is-block">
                    {post.frontmatter.date}
                  </span>
                </p>
              </header>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button" to={post.fields.slug}>
                  Keep Reading →
                </Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  );
}

NewsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};
