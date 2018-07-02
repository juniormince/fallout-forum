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
        <div><h1 className="lead">{title}</h1>
        <h2>the forum of the future!</h2></div>
      </div>
    </Router>
  </div>
);

export default Header;
