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
        <div><a href="/board"><h1 className="lead">{title}</h1></a>
        <a href="/board"><h2>the forum of the future!</h2></a></div>
      </div>
    </Router>
  </div>
);

export default Header;
