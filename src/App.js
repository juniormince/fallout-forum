import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

//c-c-c-components
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import Board from './components/Board/Board';
import DiscussionListView from './components/DiscussionListView/DiscussionListView';
import NewDiscussion from './components/DiscussionItem/NewDiscussion';
// import DiscussionItem from './components/DiscussionItem/DiscussionItem';
// import CommentItem from './components/CommentItem/CommentItem';
import CommentList from './components/CommentList/CommentList';
import Error from './components/Error/Error';

//lord style, ruler of other styles
import './styles/main.css';



const App = () => (
  <div >
    <Header className="header" title="FUTURE FORUM - THE FORUM OF THE FUTURE" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/board" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        {/* change infopage to profile page component */}
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/profile/:id"
          component={InfoPage}
        />
        <Route
          path="/board"
          component={Board}
        />
        <Route
          path="/threadlist/:id"
          component={DiscussionListView}
        />
        <Route
          path="/newthread/:id"
          component={NewDiscussion}
        />
        <Route
          path="/discussion/:id"
          component={CommentList}
        />



        {/* OTHERWISE (no path!) */}
        <Route render={() => <Error />
          // <h1>404</h1>
        } />
        {/* make 404 component */}

      </Switch>
    </Router>
  </div>
);

export default App;
