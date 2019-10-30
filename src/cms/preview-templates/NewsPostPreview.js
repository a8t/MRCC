import React from 'react';
import PropTypes from 'prop-types';
import { NewsPostTemplate } from '../../templates/news-post';

const NewsPostPreview = ({ entry, widgetFor }) => (
  <NewsPostTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    date={entry.getIn(['data', 'date'])}
    featuredimage={entry.getIn(['data', 'featuredimage'])}
    location={entry.getIn(['data', 'location'])}
    tags={entry.getIn(['data', 'tags'])}
    description={entry.getIn(['data', 'description'])}
  />
);

NewsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default NewsPostPreview;
