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

//styling
import './Error.css';

//routing
import SectionView from '../SectionView/SectionView';
import DiscussionListView from '../DiscussionListView/DiscussionListView';

const mapStateToProps = state => ({
    user: state.user,
});

class Error extends Component {
    constructor(props) {
        super(props);

        this.state = ''
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




     
//     toThread = (event) => {
//         this.props.history.push('/threadlist');
//   }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (

                <div>
                    <p className="uhoh"
                    >
                       (looks like we don't have that information)
                       <br/>
                        <Link to="/board">Go Home Kid</Link>
                    </p>
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


export default connect(mapStateToProps)(Error);