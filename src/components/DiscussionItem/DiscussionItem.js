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

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="discussionItem">
          <Link to={`/discussion/${this.props.thread.id}`}><h2>{this.props.thread.title} </h2></Link>
          <span className="container">
            latest reply by: user here (or started by: user ?)<br/>
            date of latest reply here.
            <p/>
            thread id = {this.props.thread.id}
                    {/* {this.props.thread.date} */}


                    {/* <pre>{JSON.stringify(this.props.thread.id)}</pre> */}
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