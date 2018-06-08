import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import CommentItem from '../CommentItem/CommentItem';
import './DiscussionItem.css';

const mapStateToProps = state => ({
  user: state.user,
});

class DiscussionItem extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
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
          <div className="DiscussionItem">
          {/* !!!! clean up p tags and spacing by moving all css tags to Board css !!!! */}
          <p/>
            <Link to="/discussion">A Thread</Link>
            {/* <CommentItem /> */}
          </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DiscussionItem);