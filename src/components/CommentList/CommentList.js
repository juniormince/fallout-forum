import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import CommentItem from '../CommentItem/CommentItem';

import '../../styles/main.css';


const mapStateToProps = state => ({
    user: state.user,
});

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentList: [],
            reply: '',
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getComments();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            // this.props.history.push('home');
            //change to forbidden
        }
    }

    //get comments from discussion
    getComments = () => {
        // console.log('this.props.match', this.props.match);
        axios.get(`/api/comments/${this.props.match.params.id}`)
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    commentList: response.data,
                });
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
    };


    // for textarea reply
    handleChange = (event) => {
        this.setState({ reply: event.target.value });
        // console.log(event.target.value);
    }

    //getting a 500 atm
    addReply = (event) => {
        event.preventDefault();
        // console.log('whats state', this.state);
        axios.post('/api/newReply', this.state)
            .then(response => {
                // console.log(response);
                this.getComments();
            }).catch(error => {
                console.log(error);
                alert(error);
            })
        // alert('fyi you wrote: ' + this.state.value);
        this.setState({
            value: ''
        });
    }


    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div className="commentList">

                    <div>
                        {this.state.commentList.map(comment =>
                            <CommentItem key={comment.id}
                                comment={comment}
                                getComments = {this.getComments}/>
                        )}
                    </div>

                    <form id="replyBox" onSubmit={this.addReply}>
                        <label>
                            Add Reply:<p />
                            <span id="theBox">
                                <textarea form="replyBox" value={this.state.value} onChange={this.handleChange} /></span>
                        </label>
                        <input id="addReply" type="submit" value="Submit" />
                    </form>
                </div>
            );
        }

        return (
            <div className="gridCommentList">
                <Nav />
                {content}
            </div>
        );
    }
}


export default connect(mapStateToProps)(CommentList);