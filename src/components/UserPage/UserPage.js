import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        alias: '',
        location: '',
        timezone: '',
        contact: '',
        img: '',
      }
    }
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  handleChange = propertyName => event => {
    this.setState({
      profile: {
        ...this.state.saveProfile,
        [propertyName]: event.target.value,
      }
    });
  }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="control">
          <h1>
            coming soon: the profile settings page
          </h1>
            the ability to edit your profile info<br />
            will happen here
          <form id="saveProfile" onSubmit={this.saveProfile}>
            alias:
            <input type="text" onChange={this.handleChange('alias')} value={this.state.profile.alias} placeholder='alias (get and place here by ID?)' />
            location:
            <input type="text" onChange={this.handleChange('location')} value={this.state.profile.location} placeholder='location' />
            timezone:
            <input type="text" onChange={this.handleChange('timezone')} value={this.state.profile.timezone} placeholder='timezone' />
            contact:
            <input type="text" onChange={this.handleChange('contact')} value={this.state.profile.contact} placeholder='contact' />
            image url:
            <input type="text" onChange={this.handleChange('img')} value={this.state.profile.img} placeholder='img' />
            <input className="button" type="submit" value="SAVE" />
          </form>


        </div >
      );
    }

    return (
      <div className="gridSettings">
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

