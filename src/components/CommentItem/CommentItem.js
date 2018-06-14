import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import axios from 'axios';


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

  handleChange = (event) => {
    this.setState({ reply: event.target.value });
    console.log(event.target.value);
  }



  //EDIT COMMENTS
  handleEdit = () => {
    console.log('edit button clicked');
    this.setState({
      editable: !this.state.editable
    });
  }

  editComment = event => {
    event.preventDefault();
    // axios.put('/api/editComment/:id', this.props.comment.reply)
    // .then(response => {
    //     console.log(response);
    // }).catch(error => {
    //     console.log(error);
    // })
  }

  //DELETE COMMENTS
  handleDelete = () => {
    console.log('delete button clicked');
  }

  deleteComment = event => {
    event.preventDefault();
    // axios.delete('/api/deleteComment/:id', this.props.comment.id)
    // .then(response => {
    //     console.log(response);
    // }).catch(error => {
    //     console.log(error);
    // })
  }



  render() {
    let content = null;
    // let comment = this.state.editable ? 
    // <textarea type='text' defaultValue={this.props.comment.reply} /> : '' or {this.props.comment.reply} here?;
    // // return (
    //     <div>
    //         {name}
    //         {description}
    //         <button onClick={this.props.handleDelete} >Delete</button>
    //         <button onClick={this.handleEdit}> Edit </button>

    if (this.props.user.userName) {
      content = (
        <div>
          <span className="mini-profile">
            {/* MAKE MINI PROFILE COMPONENT */}
            <img src={this.props.comment.profile_img} width="100px" alt="user avatar" />
            <p>username = <Link to={`/profile/${this.props.comment.person_id}`}> {this.props.comment.username}</Link>
            </p>
            <p />
            add username link to profile!
            </span>

          <span className="comment">
            <p>{this.props.comment.reply}</p>
            {this.props.user.userId === this.props.comment.person_id ?
              <span>
                { this.state.editable ? <textarea></textarea> : 'not editable' }
                <button onClick={this.handleEdit/*(this.props.comment.reply.id) */}>Edit</button>
                <button onClick={this.handleDelete/*(this.props.comment.reply) ?? another ternary if its yours? open to textarea?*/}>Delete</button>
              </span> : 'no buttons for you'}
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