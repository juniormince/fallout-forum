import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';


import { USER_ACTIONS } from '../../redux/actions/userActions';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class CommentItem extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  //......UHHHHHHHH
  // editComment = () => {
  //   axios.put('/api/editComment', this.props.comment.reply)
  // }







  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <span className="mini-profile">
              {/* MAKE MINI PROFILE COMPONENT */}
              <img src={this.props.comment.profile_img} width="100px"/>
              <p>username = {this.props.comment.username}</p>
              <p/>
              add username link to profile!
            </span>

          <span className="comment">
            <p>{this.props.comment.reply}</p>
          </span>

        </div>
      );
    }

    return (
      <div className="gridComment">
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CommentItem);