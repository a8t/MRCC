import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = styled.nav`
  border-bottom: 2px solid #ff8506;
  .navbar-brand {
    flex-grow: 1;
  }

  .navbar-menu {
    flex-grow: 0;
  }
  .navbar-start {
    margin-left: auto;
    margin-right: unset;
  }

  .burger {
    margin-left: 16px;
  }

  .donate-button {
    box-sizing: margin-box;
    margin: 4px 0;
    border-radius: 4px;
    margin-left: auto;
    /* background: green; */
    color: white;
    &:hover {
      color: white;
      background: rgba(0, 85, 85, 0.9) !important;
    }
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

const NavbarLink = ({ to, children, className }) =>
  to ? (
    <Link to={to} className={`navbar-item is-size-5 ${className}`}>
      {children}
    </Link>
  ) : (
    <span className="navbar-item is-size-5">{children}</span>
  );

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

        <NavbarLink
          className="donate-button has-primary-background"
          to="/donate"
        >
          Donate
        </NavbarLink>

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
          <div class="navbar-item has-dropdown is-hoverable">
            <NavbarLink>About</NavbarLink>
            <div class="navbar-dropdown">
              <NavbarLink to="/mission">Our Mission</NavbarLink>
              <NavbarLink to="/team">Our Team</NavbarLink>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <NavbarLink to="/programs">Programs</NavbarLink>
            <div class="navbar-dropdown">
              <NavbarLink to="/programs/education-and-training">
                Education and Training
              </NavbarLink>
              <NavbarLink to="/programs/information-and-referral">
                Information and Referral
              </NavbarLink>
              <NavbarLink to="/programs/research-and-advocacy">
                Research and Advocacy
              </NavbarLink>
            </div>
          </div>
          <NavbarLink to="/news">News</NavbarLink>
          <NavbarLink to="/gallery">Gallery</NavbarLink>
          <NavbarLink to="/contact">Contact</NavbarLink>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
