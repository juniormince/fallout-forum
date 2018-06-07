import React from 'react';
import { Link } from 'react-router-dom';
//icon pack here?

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Welcome (placeholder)
          </Link>
        </li>
        <li>
          <Link to="/board">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile">
            Profile Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
