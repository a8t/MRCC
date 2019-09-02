import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logo from '../../img/mrc_logo_only.svg';

const Nav = styled.nav`
  border-bottom: 2px solid #ff8506;

  .navbar-start {
    margin-left: auto;
    margin-right: unset;
  }
`;

const Logo = styled(Link)`
  img {
    width: 100px;
  }

  span {
    font-size: 14px;
    padding-left: 4px;
    line-height: 1em;
  }

  @media (min-width: 1024px) {
    img {
      max-height: unset !important;
      width: 140px;
    }

    span {
      padding-left: 8px;
      font-size: 18px;
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
        <Logo to="/" className="navbar-item" title="MRCC logo">
          <img src={logo} alt="MRCC" />
          <span className="has-mrcc-font">
            Migrants Resource <br></br>Centre Canada
          </span>
        </Logo>
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
          <Link className="navbar-item" to="/mission">
            Our mission
          </Link>
          <Link className="navbar-item" to="/">
            Campaigns
          </Link>
          <Link className="navbar-item" to="/blog">
            Blog
          </Link>
          <Link className="navbar-item" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
