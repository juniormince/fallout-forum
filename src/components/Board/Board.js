import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//styling
import './Board.css';

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
        <div>
          <p className="basicBoard">
            {/* Nav component */}
            {/* Header component */}
            {/* SectionView component */}
            Board (home for logged in user)
            <SectionView />
          </p>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}


export default connect(mapStateToProps)(Board);