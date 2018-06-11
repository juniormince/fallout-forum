import React from 'react';
import '../../styles/main.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

const Header = ({ title }) => (
  <div className="instructions">
  <div/>
    <Router>
      <div>
        <a href="/board"><h1 className="lead">{title}</h1></a>
      </div>
    </Router>
  </div>
);

export default Header;
