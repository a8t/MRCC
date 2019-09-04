import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import IndexPagePreview from './preview-templates/IndexPagePreview';
import MissionPagePreview from './preview-templates/MissionPagePreview';
import NewsIndexPagePreview from './preview-templates/NewsIndexPagePreview';
import NewsPostPreview from './preview-templates/NewsPostPreview';

import withStyledComponentsRendered from './withStyledComponentsRendered';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

const previews = {
  index: IndexPagePreview,
  mission: MissionPagePreview,
  'news-index': NewsIndexPagePreview,
  news: NewsPostPreview,
};

Object.entries(previews).forEach(([name, component]) => {
  CMS.registerPreviewTemplate(name, withStyledComponentsRendered(component));
});
