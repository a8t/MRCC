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

CMS.registerPreviewTemplate(
  'index',
  withStyledComponentsRendered(IndexPagePreview)
);
CMS.registerPreviewTemplate(
  'mission',
  withStyledComponentsRendered(MissionPagePreview)
);
CMS.registerPreviewTemplate(
  'news-index',
  withStyledComponentsRendered(NewsIndexPagePreview)
);
CMS.registerPreviewTemplate(
  'news',
  withStyledComponentsRendered(NewsPostPreview)
);
