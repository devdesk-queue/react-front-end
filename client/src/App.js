import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Navigation from './components/Navigation';
import Home from './components/Home';
import AccountForm from './components/AccountForm';

class App extends Component {
    render() {
        return (
            <Container>
                <Row>
                  <Col>
                    <Navigation/>
                  </Col>
                </Row>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={AccountForm}/>
                <Route path="/register" component={AccountForm}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(App);