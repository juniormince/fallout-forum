import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
// import UserPage from '../UserPage/UserPage';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: [],
    };
  }



  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getProfile(3);
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

  getProfile = (id) => {
    // console.log('this.props.match', this.props.match)
    axios.get(`/api/profile/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          profile: response.data,
        });
      })
      .catch((error) => {
        console.log('error on get: ', error);
      })
  };


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="container">

          <div className="profilepage">

            {/* make a component for profile info */}
          <ul>
              {this.state.profile.map(prof =>
                <li key={prof.id}>
                <h1>Profile Page</h1>
                <img id="avatar" src={prof.profile_img} alt="profile avatar"/><br/>
                 username: 
                 {prof.username}<br/>
                  {/* {prof.profile_alias}<br/> */}
                 location: 
                 {prof.profile_location}<br/>
                 timezone: 
                 {prof.profile_timezone}<br/>
                 contact: 
                 {prof.profile_contact}

                </li>
              )}
            </ul>


          </div>

          <button 
          id="btn-logout"
            onClick={this.logout}
          >
            Log Out
          </button>

        </div >
      );
    }

    return (
      <div className="gridProfile">
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
