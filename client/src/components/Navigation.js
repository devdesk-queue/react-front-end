import React, {Component} from 'react';
import {NavLink as RRNavLink} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import logo from './logo.png';

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.toggle = this
            .toggle
            .bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <React.Fragment>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={RRNavLink} to="/">
                        <Container>
                        <Row>
                        <Col className="d-flex align-items-center"><img src={logo}/></Col>
                        <Col className="d-flex align-items-center"> <span>DevDesk Queue</span></Col>
                        </Row>
                        </Container>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Add Ticket</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/" activeClassName="active">View Tickets</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink tag={RRNavLink} exact to="/register" activeClassName="active">Register</NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink tag={RRNavLink} exact to="/login" activeClassName="active">Login</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}
