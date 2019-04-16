import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Navigation from './components/Navigation';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import CreateTicket from './components/CreateTicket';
import TicketList from './components/TicketList';

export default class App extends Component {
    render() {
        return (
            <div>
                <Container>
                  <Row>
                    <Col>
                      <Navigation/>
                      <Route exact path="/" component={Home}/>
                      <Route path="/view-tickets" component={TicketList}/>
                      <Route path="/create-ticket" component={CreateTicket}/>
                      <Route path="/login" component={AccountForm}/>
                      <Route path="/register" component={AccountForm}/>
                    </Col>
                  </Row>
                </Container>
            </div>
        );
    }
}