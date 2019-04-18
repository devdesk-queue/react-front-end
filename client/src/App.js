import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';

import Navigation from './components/Navigation';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import CreateTicket from './components/CreateTicket';
import TicketList from './components/TicketList';
import {PrivateRoute} from './utility/auth';
import AdminPanel from './components/AdminPanel';
import AccountPanel from './components/AccountPanel';
import {accountInfo} from './actions/account/info';

class App extends Component {
    componentDidMount() {

        //Get account info if the user has a valid token
        const token = localStorage.getItem('token');

        //If the account info is not in redux store, and there's a token
        if (this.props.info.role === undefined && token) {

            //Decode token to get user ID
            const decodedToken = jwtDecode(token);

            //Make API call for user Info
            this
                .props
                .accountInfo(decodedToken.subject);
        }
    }
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
                            <PrivateRoute path="/admin" component={AdminPanel}/>
                            <PrivateRoute path="/account" component={AccountPanel}/>
                            <Route path="/login" component={AccountForm}/>
                            <Route path="/register" component={AccountForm}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ({account}) => {
    return {info: account.info}
}

export default connect(mapStateToProps, {accountInfo})(App);