import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Layout from '../../components/shared/Layout';

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

  .donate-body {
    padding: 8vmin;
    margin: 4vmin;
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

    .donate-form {
      margin: auto;
      margin-top: 32px;
      padding: 16px;
      &:hover {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.19),
          0 2px 5px 0 rgba(0, 0, 0, 0.24);
      }
    }
  }
`;

export default function DonatePage() {
  return (
    <Layout>
      <Main>
        <header></header>
        <section className="card donate-body">
          <h1 className="has-text-weight-bold is-size-3 is-size-2-tablet is-size-1-desktop ">
            Donate
          </h1>

          <p>
            Thank you for your interest in supporting the Migrants Resource
            Centre of Canada. Donations can be sent securely via PayPal or
            credit card via the Donate link below.
          </p>

          <form
            className="donate-form card"
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="MTK3UUJV58VMU"
            />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </section>
      </Main>
    </Layout>
  );
}
