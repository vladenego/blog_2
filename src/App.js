import React from 'react';
import logo from './logo.svg';
import Header from './components/Header.js';
import Register from './components/Register.js';
import PostsList from './components/PostsList.js';
import SinglePost from './components/SinglePost.js';
import Dashboard from './components/Dashboard.js';
import CreatePost from './components/CreatePost.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <PostsList />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/createPost">
          <CreatePost />
        </Route>
        <Route path="/:id">
        <SinglePost />
        </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
