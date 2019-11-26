import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import theme from './theme';
import './all.sass';
import useSiteMetadata from '../hooks/useSiteMetadata';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Helmet>
          <html
            lang="en"
            className="has-navbar-fixed-top has-spaced-navbar-fixed-top"
          />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />

          <link
            rel="icon"
            type="image/svg"
            href="/img/favicon.ico"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/svg"
            href="/img/favicon.ico"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <Navbar />
        {children}
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default TemplateWrapper;
