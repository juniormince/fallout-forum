import React from 'react';
import './Header.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

const Header = ({ title }) => (
  <div className="instructions">
    <Router>
      <div>
        <a href="/board"><h1 className="lead">{title}</h1></a>
      </div>
    </Router>
  </div>
);

export default Header;
