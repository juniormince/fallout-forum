import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import '../../styles/main.css';

//routing
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
      // this.props.history.push('home'); //??????? infinite looping??
      //change to forbidden
    }
  }




  getThreads = () => {
    console.log('this.props.match', this.props.match)
    axios.get(`/api/threads/${this.props.match.params.id}`)
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
        <div className="discussionList">
        
          <div className="threadButton"><Link to="/newthread" id="btn-thread">new thread</Link></div>

          {/* <pre>{JSON.stringify()}</pre> */}

          {this.state.threadList.map(thread =>
            <DiscussionItem key={thread.id}
              thread={thread} />
            //pass props to NewDiscussion??
          )}
        </div>

      );
    }

    return (
      // <div className="gridThreadList">
      <div className="gridThread">
        <Nav />
        {content}
      </div>
    );
  }
}


export default connect(mapStateToProps)(DiscussionList);