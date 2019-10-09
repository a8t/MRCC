import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = styled.nav`
  border-bottom: 2px solid #ff8506;

  .navbar-start {
    margin-left: auto;
    margin-right: unset;
  }
`;

const LogoContainer = styled(Link)`
  .logo {
    width: 200px;
  }

  @media (min-width: 1024px) {
    .logo {
      max-height: unset !important;
      width: 300px;
    }
  }
`;

const Navbar = () => {
  const [active, setActive] = useState(false);

  const toggleHamburger = () => {
    setActive(!active);
  };

  const navBarActiveClass = active ? 'is-active' : '';

  return (
    <Nav
      className="navbar is-fixed-top is-spaced"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-brand">
        <LogoContainer to="/" className="navbar-item" title="MRCC logo">
          <Logo className="logo" fullNamePosition="right" />
        </LogoContainer>
        {/* Hamburger menu */}
        <div
          className={`navbar-burger burger ${navBarActiveClass}`}
          data-target="navMenu"
          onClick={() => toggleHamburger()}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={`navbar-menu ${navBarActiveClass}`}>
        <div className="navbar-start">
          <Link className="navbar-item is-size-5" to="/mission">
            Our Mission
          </Link>
          <Link className="navbar-item is-size-5" to="/team">
            Our Team
          </Link>
          {/* <Link className="navbar-item" to="/campaigns">
            Campaigns
          </Link> */}
          <Link className="navbar-item is-size-5" to="/news">
            News
          </Link>
          <Link className="navbar-item is-size-5" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
