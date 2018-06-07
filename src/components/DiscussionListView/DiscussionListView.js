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

//styling
import './DiscussionListView.css';

//routing
import SectionView from '../SectionView/SectionView';
import DiscussionItem from '../DiscussionItem/DiscussionItem';

const mapStateToProps = state => ({
  user: state.user,
});

class DiscussionList extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
      //change to forbidden
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div >
          <p className="DiscussionList">

            <Link to="/threadtitle">List of Threads (by Section ID)</Link>

           {/* <DiscussionItem /> */}
          </p>
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


export default connect(mapStateToProps)(DiscussionList);