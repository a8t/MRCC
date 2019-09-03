import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import MissionPagePreview from './preview-templates/MissionPagePreview';
import NewsPostPreview from './preview-templates/NewsPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

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
  'news',
  withStyledComponentsRendered(NewsPostPreview)
);
