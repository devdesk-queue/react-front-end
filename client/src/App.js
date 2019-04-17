import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import Navigation from './components/Navigation';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import CreateTicket from './components/CreateTicket';
import TicketList from './components/TicketList';
import {PrivateRoute} from './utility/auth';
import AdminPanel from './components/AdminPanel';

export default class App extends Component {
    render() {
        const NavigationWithRouter = withRouter(Navigation);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="mb-3">
                                <NavigationWithRouter/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Route exact path="/" component={Home}/>
                            <PrivateRoute path="/view-tickets" component={TicketList}/>
                            <PrivateRoute path="/create-ticket" component={CreateTicket}/>
                            <PrivateRoute path="/admin-panel" component={AdminPanel}/>
                            <Route path="/login" component={AccountForm}/>
                            <Route path="/register" component={AccountForm}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}