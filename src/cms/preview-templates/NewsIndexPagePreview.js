import React from 'react';
import PropTypes from 'prop-types';
import { NewsIndexPageTemplate } from '../../templates/news-index-page';

const NewsIndexPagePreview = ({ entry, widgetFor }) => (
  <NewsIndexPageTemplate
    content={widgetFor('body')}
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    image={entry.getIn(['data', 'image'])}
  />
);

NewsIndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default NewsIndexPagePreview;
