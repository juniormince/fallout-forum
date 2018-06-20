import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { USER_ACTIONS } from '../../redux/actions/userActions';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      newComment: {
        reply: this.props.comment.reply,
        replyId: this.props.comment.id
      }
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  handleChangeEdit = (event) => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        reply: event.target.value,
      }
    });
    // console.log(event.target.value);
  }



  //EDIT COMMENTS
  handleEditToggle = (comment) => {
    this.setState({
      editable: !this.state.editable,
    });
    // console.log(this.state.editable);
  }

  handleEdit = (comment) => {
    // console.log(this.state.editable);
    this.editComment(comment);
  }

  editComment = comment => {
    axios.put(`/api/editComment`, comment)
      .then(response => {
        this.props.getComments();
        this.handleEditToggle();
      }).catch(error => {
        console.log(error);
      })
  }


  deleteComment = id => event => {
    axios.delete(`/api/deleteComment/${id}`, id)
      .then(response => {
        // console.log(response);
        this.props.getComments();
      }).catch(error => {
        console.log(error);
      })
  }



  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <span className="mini-profile">
            <img className="userAvatar" src={this.props.comment.profile_img} width="150px" alt="user avatar" />
            <span className="miniInfo">
              <span className="text"><Link to={`/profile/${this.props.comment.person_id}`}> {this.props.comment.username}</Link>
              </span>
            </span>
          </span>

          <span className="comment">
            {this.props.user.userId === this.props.comment.person_id ?
              <span>
                {this.state.editable ?
                  <span>
                    <button className="commentButtons" onClick={() => this.handleEdit(this.state.newComment)}>Save</button>
                    <button className="commentButtons" onClick={this.handleEditToggle}>Cancel</button>
                    <br />
                    <textarea defaultValue={this.props.comment.reply} onChange={this.handleChangeEdit}></textarea>

                  </span> :
                  <span>
                    <button className="commentButtons" onClick={this.handleEditToggle}>Edit</button>
                    <button className="commentButtons" onClick={this.deleteComment(this.props.comment.id)}>Delete</button>
                    <p>{this.props.comment.reply}</p>
                  </span>
                }
              </span> : <p>{this.props.comment.reply}</p> }
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