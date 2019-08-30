import React from 'react';
import styled from 'styled-components';

import logo from '../img/mrc_logo_only.svg';
import ButtonLink from '../components/ButtonLink';

const HeaderContainer = styled.header`
  display: flex;
  line-height: 1;
  align-items: center;
  flex-direction: column;
  padding: 4em;
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(255, 247, 214, 0.5) 0%,
    rgba(238, 252, 252, 0.7) 100%
  );
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    max-width: 500px;
  }

  h1 {
    margin-top: 0.7em;
  }

  h3 {
    margin: 0.5em;
  }

  @media screen and (min-width: 550px) {
    margin: 3em 3em 3em 3em;
  }
`;

const Header = ({ image, title, subtitle }) => {
  return (
    <HeaderContainer>
      <img src={logo} alt="MRCC" />
      <h1 className="is-size-5-mobile is-size-2-tablet is-size-1-widescreen has-mrcc-font ">
        <span class="line">Migrant Resource</span>{' '}
        <span class="line">Center Canada </span>
      </h1>
      <h3 className="is-size-6-mobile is-size-5-tablet is-size-4-widescreen ">
        {subtitle}
      </h3>
      <ButtonLink to="/campaigns">See our programs</ButtonLink>
    </HeaderContainer>
  );
};

export default Header;
