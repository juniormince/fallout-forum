import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
//icon pack here?
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { slide as Menu } from 'react-burger-menu';
import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

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
              width={225}
              onStateChange={this.isMenuOpen}
              customBurgerIcon={<img src="https://www.freeiconspng.com/uploads/fallout-4-icon-6.png" alt="nav icon" />}
            >
              <Link id="contact" className="menu-item" to="/board">Home</Link>
              <Link id="contact" className="menu-item" to={`/profile/${this.props.user.userId}`}>Profile Page</Link>
              <Link id="about" className="menu-item" to="/user">Control Panel</Link>

              {/* <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a> */}
            </Menu>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Nav);

