import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import '../../styles/main.css';

const mapStateToProps = state => ({
    user: state.user,
});


class SectionItem extends Component {

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
            //change to forbidden
        }
    }

    //  figure out how to click/get to thread by ID
    //     toThread = (event) => {
    //         axios.get ??
    //   }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (

                <div className="sectionItem">
                    <Link to={`/threadlist/${this.props.topic.id}`}><h1>{this.props.topic.title}</h1></Link>
                    <div className="container">
                    <p>{this.props.topic.id}</p>
                    <p>{this.props.topic.description}</p>
                    </div>
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


export default connect(mapStateToProps)(SectionItem);