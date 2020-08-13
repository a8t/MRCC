import React, { useState } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import Layout from "../components/shared/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { useStaticQuery, graphql } from "gatsby";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    height: 15vh;

    @media screen and (min-width: 1024px) {
      height: 40vh;
    }

    background: rgb(209, 107, 0);
    background: radial-gradient(
      circle at bottom,
      rgba(209, 107, 0, 1) 0%,
      rgba(249, 211, 173, 1) 100%
    );
  }
  .overallgrid {
    padding: 4vmin;
    margin-top: -10vh;
    margin-bottom: 16px;
    max-width: 1250px;

    @media (min-width: 1024px) {
      margin-top: -40vh;
      margin-bottom: 16px;
      display: grid;
      grid-template-columns: 450px 1fr;
      grid-template-areas: "marisol donate";
      gap: 32px;
    }
  }

  .marisol-image {
    @media (max-width: 1023px) {
      display: none;
    }
    position: sticky;
    top: 122px;
    grid-area: marisol;
    /* width: 400px; */
    align-self: flex-start;
    padding: 16px;

    .marisol-quote {
      padding: 16px 24px;
      margin: -32px 16px 16px 16px;
      font-size: 1.5em;
      .blue {
        color: #005555;
      }
      .emph {
        margin-top: 8px;
        font-weight: bold;
      }
      cite {
        display: block;
        font-size: 0.8em;
        margin-top: 16px;
      }
    }
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.19),
      0 2px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .donate-body {
    grid-area: donate;
  }

  .donate-body {
    padding: 4vmin;

    @media (min-width: 479px) {
      padding: 32px 48px;
    }
    @media (min-width: 1024px) {
      box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.19),
        0 2px 5px 0 rgba(0, 0, 0, 0.24);
      margin: auto;
      /* margin-bottom: 64px; */
    }

    display: flex;
    flex-direction: column;

    p {
      margin-top: 16px;
    }

    .content-grid {
      display: grid;

      .main-copy {
        grid-area: main-copy;
      }

      .marisol-image2 {
        @media (min-width: 1024px) {
          display: none;
        }
        grid-area: marisol-image;
      }
      .your-impact {
        grid-area: your-impact;
      }
      .donate-buttons {
        grid-area: donate-buttons;
      }

      grid-template-columns: 1fr;
      grid-template-areas:
        "marisol-image"
        "main-copy "
        "donate-buttons"
        "your-impact";

      grid-gap: 16px;

      @media (min-width: 1024px) {
        display: block;

        row-gap: 20px;
        .your-impact {
          margin-top: 32px;

          margin-left: -16px;
          margin-right: -16px;
        }
        .donate-buttons {
          margin-top: 32px;
        }
      }
    }

    .donate-buttons {
      align-self: flex-start;

      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media (min-width: 479px) {
        grid-template-columns: repeat(4, 1fr);
      }
      gap: 16px;
      .donate-form {
        cursor: pointer;
        -moz-box-align: center;
        align-items: center;
        display: flex;
        -moz-box-pack: center;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        width: 100%;
        padding: 1rem;
        position: relative;
        line-height: 1;
        transition: background-color 0.25s ease 0s;
        font-weight: bold;
        font-size: 1.25rem;
        font-style: normal;
        text-transform: none;
        letter-spacing: 0px;
        border-radius: 4px;
        background-color: rgb(0, 112, 204);
        background-color: rgb(204, 211, 222);
        color: #555;
        border-color: currentcolor;
        border-style: none;
        border-width: 0px;

        &:hover {
          background-color: rgb(185, 195, 210);
          color: rgb(77, 86, 102);
        }

        .custom-amount-input {
          -moz-appearance: none;
          box-shadow: none;
          outline: currentcolor none medium;
          border-radius: 4px;
          border-color: rgb(136, 148, 168);
          border-style: solid;
          border-width: 1px;
          background-color: rgb(255, 255, 255);
          padding: 0.25rem 0.5rem;
          font-size: 0.9rem;
          color: rgb(28, 35, 69);
          width: 100%;
          margin: 0;
          margin-left: 4px;
        }
      }
    }
  }
`;

export default function DonatePage({ data }) {
  const {
    markdownRemark: {
      frontmatter: { verticalimage, image },
    },
  } = useStaticQuery(graphql`
    query DonatePage {
      markdownRemark(
        frontmatter: { templateKey: { eq: "donate-index-page" } }
      ) {
        html
        frontmatter {
          image {
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          verticalimage {
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
  const [customAmount, setCustomAmount] = useState("");
  return (
    <Layout>
      <Main>
        <header></header>

        <div className="overallgrid">
          <div className="marisol-image card">
            <PreviewCompatibleImage
              imageInfo={verticalimage}
              resizeMode="contain"
            />
            <div className="card marisol-quote">
              <p>
                If I keep silent and scared, there are more migrant workers who
                will become like me.
              </p>
              <p className="emph blue">
                I fight for my rights as a worker. Because if we do, things
                change.
              </p>
              <cite>
                <span className="emph">Marisol Bobadilla</span>, Migrant Worker
              </cite>
            </div>
          </div>
          <section className="card donate-body">
            <h1 className="has-text-weight-bold is-size-3 is-size-2-tablet is-size-1-desktop">
              Donate Today.
            </h1>
            <div className="content-grid">
              <div className="main-copy">
                <h2 className="has-text-weight-bold is-size-6 is-size-5-tablet is-size-4-desktop ">
                  You can support migrant workers in Canada in their fight
                  against a system that is rigged against them.
                </h2>
                <p>
                  Too often, migrant workers stay silent in demeaning and
                  degrading working conditions because they are afraid.
                </p>

                <p>
                  When migrant workers do not know their rights, do not have
                  access to free legal services, and do not have compatriots to
                  whom they can speak in their own languages,{" "}
                  <b>they do not speak out.</b>
                </p>
                <p>
                  You can change that. By donating to MRCC, you deliver
                  on-the-ground services to migrant workers.
                </p>
                <p>
                  Your solidarity donation doesn’t just help one worker win a
                  case.{" "}
                  <span className="has-text-weight-bold">
                    Your contribution equips entire communities with the tools
                    they need to take collective action.
                  </span>
                </p>
                <p>Donate today!</p>
              </div>
              <div className="donate-buttons">
                {[3, 27, 50, 100, 270, 500, 1000].map((amount) => {
                  return (
                    <form
                      className="donate-form card"
                      action="https://www.paypal.com/cgi-bin/webscr"
                      method="post"
                      onClick={(e) => e.target.submit()}
                    >
                      ${amount}
                      <input
                        type="hidden"
                        name="business"
                        value="info@migrantsresourcecentre.ca"
                      />
                      <input type="hidden" name="cmd" value="_donations" />
                      <input
                        type="hidden"
                        name="hosted_button_id"
                        value="MTK3UUJV58VMU"
                      />
                      <input
                        type="hidden"
                        name="amount"
                        value={`${amount}.00`}
                      />
                      <input type="hidden" name="currency_code" value="CAD" />
                      <img
                        alt=""
                        width="1"
                        height="1"
                        src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                      />
                    </form>
                  );
                })}

                <form
                  className="donate-form card"
                  action="https://www.paypal.com/cgi-bin/webscr"
                  method="post"
                >
                  <input
                    type="hidden"
                    name="business"
                    value="info@migrantsresourcecentre.ca"
                  />
                  $
                  <input
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="custom-amount-input"
                    value={customAmount}
                  ></input>
                  <input type="hidden" name="cmd" value="_donations" />
                  <input
                    type="hidden"
                    name="hosted_button_id"
                    value="MTK3UUJV58VMU"
                  />
                  <input
                    type="hidden"
                    name="amount"
                    value={`${customAmount}.00`}
                  />
                  <input type="hidden" name="currency_code" value="CAD" />
                  <input
                    type="hidden"
                    name="return"
                    value="https://migrantsresourcecentre.ca/donation/thanks"
                  />
                  <img
                    alt=""
                    width="1"
                    height="1"
                    src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                  />
                </form>
              </div>

              <div className="marisol-image2">
                <PreviewCompatibleImage
                  imageInfo={image}
                  resizeMode="contain"
                />
              </div>
              <div
                className="has-primary-background your-impact"
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 2,
                  paddingBottom: 16,
                  color: "white",
                }}
              >
                <p className="has-text-weight-bold is-size-5 underline">
                  Your impact
                </p>

                <p>
                  Because of solidarity donations from people like you, this
                  year more than 100 migrant workers accessed education,
                  training programs, legal support, information and referrals.
                </p>

                <p>
                  More importantly, they were empowered to address the unequal
                  relations of power, linking individuals and their lived
                  experiences with an analysis of power and structural
                  inequality and encouraging a move from individual response to
                  a collective one.
                </p>

                <p>
                  MRCC relies on donations to provide services and support to
                  the migrant worker community. Donate now.
                </p>

                <p style={{ fontStyle: "italic" }}>
                  We would like to sincerely thank all of our funders and donors
                  for their dedication to justice, welfare, and empowerment for
                  migrant workers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Main>
    </Layout>
  );
}
