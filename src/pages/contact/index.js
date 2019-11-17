import React from 'react';
import { navigate } from 'gatsby-link';
import styled from 'styled-components';
import Layout from '../../components/shared/Layout';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    height: 30vh;

    @media screen and (min-width: 1024px) {
      height: 50vh;
    }

    background: rgb(148, 187, 233);
    background: radial-gradient(
      circle at bottom center,
      rgba(0, 153, 153, 1) 0%,
      rgba(0, 85, 85, 1) 100%
    );
  }

  .card {
    padding: 8vmin;
    margin: 4vmin;
    margin-top: -20vh;
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

  .contact-main {
    padding: 8vmin;
    max-width: 50em;

    address {
      margin-top: 16px;
      border-left: 2px solid #ccc;
      padding-left: 16px;
    }

    .contact-phone {
      margin: 6vmin 0;
    }
  }
`;

export default function Index() {
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const formEntries = Array.from(form.elements).map(e => [e.name, e.value]);

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...Object.fromEntries(formEntries),
      }),
    });

    navigate(form.getAttribute('action'));
  };

  return (
    // yes the markup makes me sad but that's how this css framework works :/
    <Layout>
      <Main>
        <header className="splash has-primary-background"></header>
        <section className="contact-main content card">
          <h1 className="has-text-weight-bold is-size-3 is-size-2-tablet is-size-1-desktop ">
            Contact
          </h1>
          <section>
            <h2>Visit us!</h2>
            <p>
              Our office is located at:
              <address>
                Unit 207
                <br />
                2482 Dufferin St
                <br />
                York, ON
                <br />
                M6B 3R1
              </address>
            </p>
            <p>
              Visits are by appointment. Please contact us by phone or email
              below to schedule one.
            </p>
          </section>

          <section
            className="contact-phone"
            style={{ marginBottom: '6vmin', marginTop: '6vmin' }}
          >
            <h2>Phone</h2>
            <p>
              You can reach us at our toll-free hotline at{' '}
              <a href="tel:+1-866-0275-4046">+1-866-275-4046</a>.
            </p>
          </section>

          <section className="contact-email">
            <h2>Email</h2>
            <p className="contact-email__text">
              You can drop us a line at{' '}
              <a href="mailto:info@migrantsresourcecentre.ca">
                info@migrantsresourcecentre.ca
              </a>{' '}
              or fill out the form below.
            </p>
            <form
              name="contact"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <label hidden>
                Don’t fill this out: <input name="bot-field" />
              </label>
              <div className="field">
                <label className="label" htmlFor="name">
                  Your name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    id="name"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'email'}>
                  Email
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'message'}>
                  Message
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="message"
                    id="message"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <button className="button is-link" type="submit">
                  Send
                </button>
              </div>
            </form>
          </section>
        </section>
      </Main>
    </Layout>
  );
}
