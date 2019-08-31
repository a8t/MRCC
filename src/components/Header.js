import React from 'react';
import styled from 'styled-components';

import logo from '../img/IMG_5158.jpg';
import ButtonLink from '../components/ButtonLink';

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'both-items';

  img,
  section {
    grid-area: both-items;
    height: 50vh;
    object-fit: cover;
    object-position: 50% 20%;
  }

  @media screen and (min-width: 1024px) {
    img,
    section {
      height: 70vh;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 55, 55, 0.7);
    color: white;
    padding: 3em;
    text-align: center;
    text-wrap: balance;

    h1,
    h2 {
      text-shadow: 4px 4px 6px rgba(55, 12, 12, 0.8);
    }

    h2 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
  }

  img {
    width: 100%;
  }
  section {
    background: rgba(0, 55, 55, 0.4);
  }
`;

const Header = ({ image, title, subtitle }) => {
  return (
    <HeaderContainer>
      <img src={logo} alt="MRCC" />

      <section>
        <h1 className="is-size-3-mobile is-size-3-tablet is-size-3-touch is-size-1-desktop is-size-1-widescreen is-size-1-fullhd">
          {title}
        </h1>
        <h2 className="is-size-5-mobile is-size-5-tablet is-size-5-touch is-size-5-desktop is-size-5-widescreen is-size-5-fullhd">
          {subtitle}
        </h2>
        <ButtonLink to="/campaigns">See our campaigns</ButtonLink>
      </section>
    </HeaderContainer>
  );
};

export default Header;
