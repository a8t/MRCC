import React from 'react';
import { navigate } from 'gatsby-link';
import Layout from '../../components/shared/Layout';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

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
      <section
        className="content"
        style={{ maxWidth: '60em', margin: 'auto', padding: '8vmin' }}
      >
        <h1>Contact</h1>
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
    </Layout>
  );
}
