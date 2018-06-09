import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import '../../styles/main.css';

//routing
import SectionView from '../SectionView/SectionView';

const mapStateToProps = state => ({
  user: state.user,
});

class Board extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
      //change to forbidden
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="board">
            Board (home for logged in user)
            <SectionView />
        </div>
      );
    }

    return (
      <div className="gridBase">
        <Nav />
        { content }
      </div>
    );
  }
}


export default connect(mapStateToProps)(Board);