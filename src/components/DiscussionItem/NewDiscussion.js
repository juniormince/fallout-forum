import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import '../../styles/main.css';


const mapStateToProps = state => ({
    user: state.user,
});

class newThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newThread: {
                title: '',
                body: '',
            }
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
            //change to forbidden
        }
    }



    // new thread data 
    handleChange = propertyName => event => {
        this.setState({
            newThread: {
                ...this.state.newThread,
                [propertyName]: event.target.value,
            }
        });
        console.log(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //POST REQ
        this.newThread();

        this.setState({
            value: ''
        });
        this.props.history.push('/threadlist/:id');
    }


    newThread = () => {
        axios.post('/api/newThread', this.state.newThread)
            .then((response) => {
                console.log(response.data);
                let commentObject = {reply: this.state.newThread.body, commentList: response.data} 
                axios.post('/api/newReply', commentObject)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log('error on get: ', error);
                    })
            })
            .catch((error) => {
                console.log('error on get: ', error);
            })
    };

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form id="newThreadForm" onSubmit={this.handleSubmit}>
                    <label>
                        <div id="newTitle">
                            Title:
                        </div>
                        <input id="newThreadTitle" type="text" onChange={this.handleChange('title')} />
                        <p />
                        <div id="newThreadBody"><textarea value={this.state.value} onChange={this.handleChange('body')} /></div>
                    </label>

                    <input id="threadAdd" type="submit" value="Submit" />
                </form>

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


export default connect(mapStateToProps)(newThread);