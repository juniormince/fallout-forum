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

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class DiscussionItem extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 'tell us how you really feel.'
    // };
  }



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
        <div className="RENAME">
          {/* !!!! clean up p tags and spacing by moving all css tags to Board css !!!! */}
          <p />
          {/* <Link to="/discussion">A Thread</Link> */}
          {/* <CommentItem /> */}


          <div className="discussionItem">
                    <Link to="/discussion"><h3>{this.props.thread.title} </h3></Link>
                    <div className="container">
                    {/* <p>there would be comments by users here</p> */}
                        {/* <p>{this.props.thread.comment_id}</p> */}
                    </div>
                </div>



          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Add Reply:<p/>
          <span id="theBox"><textarea value={this.state.value} onChange={this.handleChange} /></span>
            </label>
            <input id="addReply" type="submit" value="Submit" />
          </form> */}
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