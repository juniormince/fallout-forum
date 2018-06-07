import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
//icon pack here?

import { slide as Menu } from 'react-burger-menu';
import './Nav.css';



class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  showSettings(event) {
    event.preventDefault();
  }

  isMenuOpen = (state) => {
    return state.isOpen;
  };


  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    return (
      <div>
        <Menu
          overlayClassName={"sidenav"}
          width={280}
          onStateChange={this.isMenuOpen}
          customBurgerIcon={<img src="https://www.freeiconspng.com/uploads/fallout-4-icon-6.png" />}
        >
          {/* <Link id="home" className="menu-item" to="/">Home</a> */}
          <Link id="about" className="menu-item" to="/user">Welcome (placeholder)</Link>
          <Link id="contact" className="menu-item" to="/board">Home</Link>
          <Link id="contact" className="menu-item" to="/profile">Profile Page</Link>
          
          {/* <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a> */}

        </Menu>

        {/* <Router>
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
        </Router> */}
      </div>
    );
  }
}
export default Nav;




// const Nav = () => (
  // <div className="navbar">
  //   <div>
  //     <ul>
  //       <li>
  //         <Link to="/user">
  //           Welcome (placeholder)
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to="/board">
  //           Home
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to="/profile">
  //           Profile Page
  //         </Link>
  //       </li>
  //     </ul>
  //   </div>
  // </div>





// );

// export default Nav;
