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

class newThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            // newThread: 
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
    handleChange = (event) => {
        this.setState({ value: event.target.value });
        console.log(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //POST REQ
        //addThread();

        this.setState({
            value: ''
        });
        this.props.history.push('/threadlist');
    }


     //     addThread = () => {
    //     axios.post('/api/addthread')
    //       .then((response) => {
    //         console.log(response.data);
    //         this.setState({
    //           newThread: response.data,
    //         });
    //       })
    //       .catch((error) => {
    //         console.log('error on get: ', error);
    //       })
    //   };

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (

                <form id="newThreadForm" onSubmit={this.handleSubmit}>
                    <label>
                        <div id="newTitle">
                            Title: 
                        </div>
                        <input id="newThreadTitle" type="text" onChange={this.handleChange} />
                        <p />
                        <div id="newThreadBody"><textarea value={this.state.value} onChange={this.handleChange} /></div>
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