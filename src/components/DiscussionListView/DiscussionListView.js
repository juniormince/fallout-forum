import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import '../../styles/main.css';

//routing
import SectionView from '../SectionView/SectionView';
import DiscussionItem from '../DiscussionItem/DiscussionItem';

const mapStateToProps = state => ({
  user: state.user,
});

class DiscussionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threadList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getThreads();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
      //change to forbidden
    }
  }




  getThreads = () => {
    axios.get('/api/threads')
      .then((response) => {
        console.log(response.data);
        this.setState({
          threadList: response.data,
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
        <div>
          <div className="discussionList">
          <div className="threadButton"><Link to="/newthread" id="btn-thread">new thread</Link></div>
          <br/><br/><br/><br/> 
          {/* ^^ AHAHA GET RID OF THESE ^^ */}
            {this.state.threadList.map(thread =>
              <DiscussionItem key={thread.id}
                thread={thread} />
            )}
          </div>
        </div>

      );
    }

    return (
      <div className="gridThreadList">
        <Nav />
        {content}
      </div>
    );
  }
}


export default connect(mapStateToProps)(DiscussionList);