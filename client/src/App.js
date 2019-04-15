import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from './components/Home';
import { Alert } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World From React</h1>
          <h2>{this.props.test}</h2>
          <Alert color="primary">Hello World From ReactStrap</Alert>
          <Route path="/" component={Home} />
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(App);