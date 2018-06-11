import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class DiscussionItem extends Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   value: 'tell us how you really feel.'
  // };
  // }



  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }


  // for textarea
  // handleChange = (event) => {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit= (event) => {
  //   alert('fyi you wrote:' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="discussionItem">
          <Link to="/discussion"><h2>{this.props.thread.title} </h2></Link>
          <span className="container">
            there would be comments by users here
                    {/* {this.props.thread.date} */}
          </span>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DiscussionItem);