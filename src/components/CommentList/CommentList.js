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
import CommentItem from '../CommentItem/CommentItem';

import '../../styles/main.css';


const mapStateToProps = state => ({
    user: state.user,
});

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'good luck sayin somethin bucko',
            commentList: [],
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getComments();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
            //change to forbidden
        }
    }




    getComments = () => {
        axios.get('/api/comments')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    commentList: response.data,
                });
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
    };

    // for reply/textarea
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        alert('fyi you wrote: ' + this.state.value);
        event.preventDefault();

        this.setState({
            value: 'anything else?',
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
                                    comment={comment} />
                                //change comment.id to just {comment, i} ??
                            )}
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Add Reply:<p />
                                <span id="theBox"><textarea value={this.state.value} onChange={this.handleChange} /></span>
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