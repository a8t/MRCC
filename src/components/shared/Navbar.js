import React, { useState } from 'react';
import { Link } from 'gatsby';
import logo from '../../img/mrc_logo_only.svg';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const toggleHamburger = () => {
    setActive(!active);
  };

  const navBarActiveClass = active ? 'is-active' : '';

  return (
    <nav
      className="navbar is-transparent is-fixed-top"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" title="Logo">
          <img src={logo} alt="MRCC" style={{ width: '88px' }} />
        </Link>
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
    </nav>
  );
};

export default Navbar;
