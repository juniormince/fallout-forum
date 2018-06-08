import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import './SectionView.css';
import SectionItem from '../SectionItem/SectionItem';

const mapStateToProps = state => ({
  user: state.user,
});




class SectionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
    };
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getTopics();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  getTopics = () => {
    axios.get('/api/topics')
      .then((response) => {
        console.log(response.data);
        this.setState({
          topicList: response.data,
        });
      })
      .catch((error) => {
        console.log('error on get: ', error);
      })
  };

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (

        <div className="Topics">
          {this.state.topicList.map(topic =>
            <SectionItem key={topic.id}
              topic={topic} />
          )}
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SectionView);